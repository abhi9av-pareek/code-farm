import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AboutSection, ContactSection, ProjectsSection, SkillsSection } from './components/PortfolioSections'
import { ExploreHud } from './components/scene/ExploreHud'
import { FarmScene } from './components/scene/Scene'

const sectionIds = ['home', 'projects', 'about', 'skills', 'contact']

function App() {
  const [exploring, setExploring] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(true)

  useEffect(() => {
    if (!exploring) return
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => { if (event.code === 'Escape') setExploring(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [exploring])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { threshold: [0.2, 0.5, 0.75] })
    sectionIds.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    let previousY = window.scrollY
    const onScroll = () => { const currentY = window.scrollY; setNavVisible(currentY < 80 || currentY <= previousY); previousY = currentY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setNavigationOpen(false) }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4ec] text-[#263321]">
      <header className={`fixed left-0 right-0 top-0 z-40 px-4 pt-4 transition-transform duration-500 sm:px-6 sm:pt-6 ${navVisible || navigationOpen ? 'translate-y-0' : '-translate-y-[130%]'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/45 bg-[#173020]/75 px-4 py-2 text-white shadow-xl backdrop-blur-xl sm:px-5">
          <button onClick={() => navigate('home')} className="font-black text-xs tracking-[.18em] sm:text-sm">ABHINAV&apos;S FARM</button>
          <nav className="hidden items-center gap-1 md:flex">
            {sectionIds.map((item) => <button key={item} onClick={() => navigate(item)} className={`relative rounded-full px-3 py-2 text-sm font-semibold capitalize transition ${activeSection === item ? 'text-[#dff58f]' : 'text-white/80 hover:text-white'}`}><span>{item}</span>{activeSection === item && <span className="absolute bottom-1 left-3 right-3 h-px bg-[#dff58f]" />}</button>)}
          </nav>
          <button aria-label="Toggle navigation" onClick={() => setNavigationOpen((open) => !open)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 md:hidden">{navigationOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {navigationOpen && <nav className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-1 rounded-3xl border border-white/20 bg-[#173020]/95 p-2 text-white shadow-xl backdrop-blur-xl md:hidden">{sectionIds.map((item) => <button key={item} onClick={() => navigate(item)} className="rounded-2xl px-4 py-3 text-left text-sm font-bold capitalize hover:bg-white/10">{item}</button>)}</nav>}
      </header>

      <section id="home" className="relative h-[100svh] min-h-[44rem] overflow-hidden">
        <div className="absolute inset-0"><FarmScene /></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(9,20,12,.7),rgba(9,20,12,.08)_55%,rgba(11,25,14,.45))]" />
        <div className="hero-grain pointer-events-none absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <div className="hero-copy max-w-3xl text-white">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.32em] text-lime-200">Full-stack developer · 3D web explorer</p>
            <h1 className="text-5xl font-black leading-[.88] tracking-[-.06em] sm:text-7xl lg:text-8xl">Growing ideas<br />into <span className="text-lime-300">living</span> software.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">I’m Abhinav Pareek. I build full-stack products and immersive web experiences where useful engineering meets a little more imagination.</p>
            <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => setExploring(true)} className="pointer-events-auto rounded-full bg-[#ddf786] px-6 py-3.5 font-black text-[#21331f] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(202,244,102,.3)]">Explore the farm</button><button type="button" onClick={() => navigate('projects')} className="pointer-events-auto rounded-full border border-white/45 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20">View projects</button></div>
          </div>
        </div>
        <button onClick={() => navigate('projects')} aria-label="Scroll to projects" className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-white/80 transition hover:text-white"><span className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[.2em]">Scroll<ChevronDown className="animate-bounce" size={18} /></span></button>
      </section>

      {exploring && <div className="fixed inset-0 z-50 h-[100dvh] bg-[#b9d5e7]"><FarmScene exploring /><ExploreHud onExit={() => setExploring(false)} /></div>}
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <footer className="border-t border-stone-200 px-5 py-8 text-center text-sm text-stone-500">© {new Date().getFullYear()} Abhinav Pareek · Built with React, Three.js, and a farm full of detail.</footer>
    </main>
  )
}

export default App
