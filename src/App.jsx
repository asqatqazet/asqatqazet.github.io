import { useEffect, useState } from 'react';
import CRTOverlay from './components/CRTOverlay.jsx';
import TelemetryHUD from './components/TelemetryHUD.jsx';
import SectionNav from './components/SectionNav.jsx';
import TerminalHero from './sections/TerminalHero.jsx';
import About from './sections/About.jsx';
import Experience from './sections/Experience.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import Languages from './sections/Languages.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import AudioEngine from './lib/audio.js';
import useLocalStorage from './lib/useLocalStorage.js';
import profile from './data/profile.json';

const THEMES = {
  green: { accent: '#7cffb2', dim: '#3aa86b', fg: '#d6f7d6' },
  amber: { accent: '#ffb347', dim: '#a86d22', fg: '#f7e7c6' },
  magenta: { accent: '#ff5fd2', dim: '#a8237a', fg: '#f7d6e7' },
};

export default function App() {
  const [soundOn, setSoundOn] = useLocalStorage('asihati.audio', false);
  const [theme, setTheme] = useLocalStorage('asihati.theme', 'green');

  useEffect(() => {
    const t = THEMES[theme] || THEMES.green;
    document.documentElement.style.setProperty('--color-accent', t.accent);
    document.documentElement.style.setProperty('--color-accent-dim', t.dim);
    document.documentElement.style.setProperty('--color-fg', t.fg);
  }, [theme]);

  // First-gesture audio init
  useEffect(() => {
    const onFirst = () => {
      AudioEngine.init();
      AudioEngine.setEnabled(soundOn);
      if (soundOn) AudioEngine.powerOn();
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
    window.addEventListener('pointerdown', onFirst, { once: true });
    window.addEventListener('keydown', onFirst, { once: true });
    return () => {
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
  }, [soundOn]);

  useEffect(() => {
    AudioEngine.setEnabled(soundOn);
  }, [soundOn]);

  const handleToggleSound = () => {
    if (!AudioEngine.initialized) AudioEngine.init();
    const next = !soundOn;
    setSoundOn(next);
    AudioEngine.setEnabled(next);
    if (next) AudioEngine.beep(660, 0.08);
  };

  const handleOpenResume = () => {
    window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <CRTOverlay />
      <TelemetryHUD soundOn={soundOn} onToggleSound={handleToggleSound} />
      <SectionNav />
      <main className="snap-y">
        <TerminalHero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Languages />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
