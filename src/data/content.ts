export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
}

export const siteConfig = {
  name: '{{YOUR_NAME}}',
  role: 'Desenvolvedor Fullstack',
  email: '{{YOUR_EMAIL}}',
  tagline: 'Criando experiências digitais',
  taglineHighlight: 'futuristas.',
  bio: 'Olá, eu sou {{YOUR_NAME}}. Especialista em React, Node.js e design de interface, focado em construir aplicações web performáticas e visualmente impactantes.',
  statusText: 'Disponível para Freelas',
  statusSubtext: 'Resposta em < 24h',
  social: {
    linkedin: '{{LINKEDIN_URL}}',
    twitter: '{{TWITTER_URL}}',
  },
  stats: {
    contributions: '{{CONTRIBUTIONS_COUNT}}',
    repos: '{{REPOS_COUNT}}',
  },
  meta: {
    title: 'Portfólio Dev | Dark Glass',
    description: 'Portfólio de desenvolvedor fullstack especialista em React, Node.js e design de interface.',
    ogImage: '/og-image.png',
  },
} as const;

export const techStack: string[] = [
  'React', 'Next.js', 'Tailwind CSS',
  'TypeScript', 'Node.js', 'PostgreSQL',
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '{{PROJECT_1_NAME}}',
    description: '{{PROJECT_1_DESCRIPTION}}',
    image: '/projects/project-1.webp',
    url: '#',
    tags: ['React', 'Node.js'],
  },
  {
    id: 'project-2',
    title: '{{PROJECT_2_NAME}}',
    description: '{{PROJECT_2_DESCRIPTION}}',
    image: '/projects/project-2.webp',
    url: '#',
    tags: ['Next.js', 'TypeScript'],
  },
  {
    id: 'project-3',
    title: '{{PROJECT_3_NAME}}',
    description: '{{PROJECT_3_DESCRIPTION}}',
    image: '/projects/project-3.webp',
    url: '#',
    tags: ['React Native', 'Firebase'],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: 'timeline-1',
    period: '{{YEAR_START}} — Presente',
    role: '{{ROLE_TITLE}}',
    company: '{{COMPANY_NAME}}',
    description: '{{ROLE_DESCRIPTION}}',
  },
  {
    id: 'timeline-2',
    period: '{{YEAR_START}} — {{YEAR_END}}',
    role: '{{ROLE_TITLE}}',
    company: '{{COMPANY_NAME}}',
    description: '{{ROLE_DESCRIPTION}}',
  },
  {
    id: 'timeline-3',
    period: '{{YEAR_START}} — {{YEAR_END}}',
    role: '{{ROLE_TITLE}}',
    company: '{{COMPANY_NAME}}',
    description: '{{ROLE_DESCRIPTION}}',
  },
];

export const orionSystemPrompt = `Você é o "Orion", um assistente de Inteligência Artificial integrado ao portfólio de um Desenvolvedor Fullstack.
A stack de tecnologias do desenvolvedor inclui: React, Next.js, Tailwind CSS, TypeScript, Node.js, PostgreSQL e Python.
Sua missão é atuar como um guia para visitantes e recrutadores:
1. Responder perguntas sobre as tecnologias do desenvolvedor.
2. Fazer brainstorm e sugerir ideias de arquitetura ou projetos caso o usuário peça.
Seja conciso, profissional, porém amigável e entusiasmado. Utilize formatação markdown básica para listas.
Suas respostas devem ser dadas sempre em Português do Brasil e ser relativamente curtas para caber num widget de chat.`;
