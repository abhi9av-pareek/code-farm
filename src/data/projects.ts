export type Project = {
  id: 'gyantraa' | 'digital-footprint' | 'code-farm'
  name: string
  eyebrow: string
  description: string
  technologies: string[]
  accent: string
}

export const projects: Project[] = [
  { id: 'gyantraa', name: 'Gyantraa', eyebrow: 'Learning, shaped around the learner', description: 'An AI-powered quiz and personalised learning platform designed to turn practice into a more useful feedback loop.', technologies: ['React', 'TypeScript / JavaScript', 'Node.js', 'Express', 'MongoDB', 'AI / LLMs'], accent: 'from-violet-500 via-fuchsia-500 to-rose-400' },
  { id: 'digital-footprint', name: 'Digital Footprint', eyebrow: 'A clearer view of time online', description: 'A TypeScript browser extension that tracks browsing activity, categorises websites, and surfaces digital-usage streak insights.', technologies: ['TypeScript', 'Vite', 'Chrome Extension', 'Manifest V3'], accent: 'from-cyan-400 via-sky-500 to-indigo-500' },
  { id: 'code-farm', name: '3D Code Farm Portfolio', eyebrow: 'A portfolio you can walk through', description: 'An interactive farm world created in Blender and delivered on the web with React, Three.js, and React Three Fiber.', technologies: ['Blender', 'React', 'Three.js', 'React Three Fiber', 'TypeScript'], accent: 'from-amber-300 via-lime-400 to-emerald-500' },
]

export const skillGroups = [
  { title: 'Languages', items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go'] },
  { title: 'Frontend', items: ['HTML', 'CSS', 'React', 'Vite', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express'] },
  { title: 'Databases', items: ['MongoDB', 'PostgreSQL'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Postman'] },
  { title: 'AI / 3D', items: ['LLMs', 'RAG', 'n8n', 'Blender', 'Three.js', 'React Three Fiber'] },
] as const
