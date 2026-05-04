import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'boot', label: 'boot' },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'langs', label: 'langs' },
  { id: 'contact', label: 'contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState('boot');

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3 text-xs font-mono">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={`Go to ${s.label}`}
          className="group flex items-center gap-2 justify-end"
        >
          <span
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              active === s.id ? 'opacity-100 text-[var(--color-accent)]' : 'text-[var(--color-fg-dim)]'
            }`}
          >
            {s.label}
          </span>
          <span
            className={`block w-2 h-2 border border-[var(--color-accent-dim)] rounded-full transition-all ${
              active === s.id ? 'bg-[var(--color-accent)] scale-125' : 'bg-transparent'
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
