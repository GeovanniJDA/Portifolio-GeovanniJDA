import { useState, useRef, useCallback, useEffect, type KeyboardEvent } from 'react';
import Markdown from 'react-markdown';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { Magnetic } from './Magnetic';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  role: 'assistant',
  content: 'Olá! Sou a inteligência artificial deste portfólio. Como posso te ajudar hoje?',
};

export function OrionChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/orion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Houve uma falha na síntese dos meus circuitos neurais.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'error',
        content: 'Falha de conexão com os servidores da IA central.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <GlassPanel colSpan="2" className="p-8 flex flex-col relative overflow-hidden">
      <TiltCard className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-neon">✨</span> Chat com Orion AI
          </h3>
          <span className="text-xs bg-chat-input text-neon px-3 py-1 rounded-full border border-chat whitespace-nowrap">
            Powered by Gemini
          </span>
        </div>

        <p className="text-sm text-muted mb-4">
          Pergunte sobre minhas habilidades, ou peça para a IA sugerir uma ideia de
          projeto usando a minha stack de tecnologias!
        </p>

        <div
          ref={historyRef}
          id="chat-history"
          className="flex-1 bg-chat border border-chat rounded-xl p-4 mb-4 text-sm h-56 overflow-y-auto space-y-3 flex flex-col font-mono shadow-inner"
          aria-live="polite"
          aria-label="Histórico do chat"
        >
          {messages.map((msg) => {
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="mt-3 flex gap-2">
                  <span className="text-muted font-bold shrink-0">Você&gt;</span>
                  <div className="flex-1">{msg.content}</div>
                </div>
              );
            }
            if (msg.role === 'error') {
              return (
                <div key={msg.id} className="text-red-400 mt-3 flex gap-2">
                  <span className="text-red-500 font-bold shrink-0">Erro&gt;</span>
                  <div className="flex-1">{msg.content}</div>
                </div>
              );
            }
            return (
              <div
                key={msg.id}
                className={msg.id === 'initial' ? 'text-neon/80 flex gap-2' : 'mt-3 p-3 bg-chat-input border border-chat rounded-lg flex gap-2'}
              >
                <span className="text-neon font-bold text-shadow shrink-0">Orion&gt;</span>
                <div className="flex-1 space-y-2">
                  <Markdown
                    components={{
                      p: ({ children }) => <p className="m-0">{children}</p>,
                      strong: ({ children }) => <strong className="text-neon">{children}</strong>,
                    }}
                  >
                    {msg.content}
                  </Markdown>
                </div>
              </div>
            );
          })}
        </div>

        {isLoading && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-neon/60 mb-1">
              <span>Analisando e sintetizando resposta...</span>
            </div>
            <div className="neon-line w-full opacity-50" />
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-chat-input border border-chat rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon focus-visible:ring-2 focus-visible:ring-neon transition-colors placeholder-gray-600"
            placeholder="Ex: Sugira um app combinando React e Node..."
            disabled={isLoading}
          />
          <Magnetic>
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-neon text-gray-950 px-6 py-3 rounded-xl font-semibold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-neon/20 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50"
            >
              ✨ Enviar
            </button>
          </Magnetic>
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
