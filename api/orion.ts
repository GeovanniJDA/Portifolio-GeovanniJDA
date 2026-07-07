import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Você é o "Orion", um assistente de Inteligência Artificial integrado ao portfólio de um Desenvolvedor Fullstack.
A stack de tecnologias do desenvolvedor inclui: React, Next.js, Tailwind CSS, TypeScript, Node.js, PostgreSQL e Python.
Sua missão é atuar como um guia para visitantes e recrutadores:
1. Responder perguntas sobre as tecnologias do desenvolvedor.
2. Fazer brainstorm e sugerir ideias de arquitetura ou projetos caso o usuário peça.
Seja conciso, profissional, porém amigável e entusiasmado. Utilize formatação markdown básica para listas.
Suas respostas devem ser dadas sempre em Português do Brasil e ser relativamente curtas para caber num widget de chat.`;

const MAX_MESSAGE_LENGTH = 1000;
const GEMINI_MODEL = 'gemini-1.5-flash';

// Simple in-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key is configured
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ error: 'AI service not configured' });
  }

  // Rate limiting — avoid 'as' cast to satisfy erasableSyntaxOnly
  const forwardedFor = req.headers['x-forwarded-for'];
  const firstForward = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const clientIp = firstForward?.split(',')[0]?.trim()
    ?? req.socket?.remoteAddress
    ?? 'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // Validate body
  const { message } = req.body ?? {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const trimmed = message.trim();

  if (trimmed.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [{ parts: [{ text: trimmed }] }],
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status}`, errorText);
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      ?? 'Houve uma falha na síntese dos meus circuitos neurais.';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Orion API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
