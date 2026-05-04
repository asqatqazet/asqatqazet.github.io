import { useState } from 'react';
import projects from '../data/projects.json';
import { SectionHeader } from './About.jsx';

const TAGS = ['all', 'AI/ML', 'Backend', 'Security', 'Data'];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? projects : projects.filter((p) => p.tag === filter);

  return (
    <section id="projects" className="min-h-screen w-full snap-start px-4 sm:px-10 py-20 max-w-6xl mx-auto">
      <SectionHeader tag="03" title="projects/" />
      <div className="flex flex-wrap gap-2 mb-8 font-mono text-sm">
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`px-3 py-1 border rounded transition-colors ${
              filter === t
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                : 'border-[var(--color-rule)] text-[var(--color-fg-dim)] hover:border-[var(--color-accent-dim)]'
            }`}
          >
            {t === 'all' ? '#all' : `#${t.toLowerCase().replace('/', '-')}`}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p) => (
          <article
            key={p.id}
            className="glow-border bg-[var(--color-bg-soft)]/60 rounded-md overflow-hidden flex flex-col hover:translate-y-[-2px] transition-transform"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[var(--color-bg)] border-b border-[var(--color-rule)]">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 border border-[var(--color-accent-dim)] text-[var(--color-accent)] rounded font-mono">
                  {p.tag}
                </span>
                <span className="text-xs text-[var(--color-fg-dim)] font-mono">{p.duration}</span>
              </div>
              <h3 className="text-lg text-[var(--color-fg)] font-display tracking-wide leading-tight">
                {p.title}
              </h3>
              <div className="text-xs text-[var(--color-fg-dim)] font-mono">{p.subtitle}</div>
              <p className="text-sm text-[var(--color-fg-dim)] leading-relaxed flex-1">{p.summary}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.stack.slice(0, 6).map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 border border-[var(--color-rule)] rounded text-[var(--color-fg-dim)] font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
