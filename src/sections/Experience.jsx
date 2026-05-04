import experience from '../data/experience.json';
import projects from '../data/projects.json';
import { SectionHeader } from './About.jsx';

function fmt(iso) {
  if (!iso) return 'present';
  const [y, m] = iso.split('-');
  return `${y}.${m}`;
}

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen w-full snap-start px-4 sm:px-10 py-20 max-w-5xl mx-auto">
      <SectionHeader tag="02" title="experience.log" />
      <ol className="relative border-l-2 border-[var(--color-rule)] pl-8 space-y-10">
        {experience.map((e) => {
          const subs = e.subProjects ? projects.filter((p) => e.subProjects.includes(p.id)) : [];
          return (
            <li key={e.id} className="relative">
              <span
                className={`absolute -left-[42px] top-2 w-4 h-4 rounded-full border-2 ${
                  e.type === 'education'
                    ? 'border-[var(--color-amber)] bg-[var(--color-bg)]'
                    : 'border-[var(--color-accent)] bg-[var(--color-accent)]/30'
                }`}
              />
              <div className="font-mono text-xs text-[var(--color-fg-dim)] mb-1">
                {fmt(e.start)} — {fmt(e.end)} <span className="opacity-60">// {e.type}</span>
              </div>
              <h3 className="text-xl text-[var(--color-fg)] font-display tracking-wide">
                {e.role}{' '}
                <span className="text-[var(--color-accent)]">@ {e.company}</span>
                <span className="text-[var(--color-fg-dim)] text-sm font-mono"> · {e.location}</span>
              </h3>
              <p className="text-[var(--color-fg-dim)] leading-relaxed mt-2">{e.summary}</p>
              {e.stack && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {e.stack.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 border border-[var(--color-rule)] rounded text-[var(--color-fg-dim)]">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {subs.length > 0 && (
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-sm text-[var(--color-accent)] hover:text-[var(--color-cyan)] font-mono">
                    ▸ {subs.length} client engagements
                  </summary>
                  <ul className="mt-3 space-y-3 ml-4 border-l border-[var(--color-rule)] pl-4">
                    {subs.map((p) => (
                      <li key={p.id}>
                        <div className="text-[var(--color-fg)] text-sm">{p.title}</div>
                        <div className="text-xs text-[var(--color-fg-dim)] font-mono">{p.duration} · {p.subtitle}</div>
                        <div className="text-xs text-[var(--color-fg-dim)] mt-1">{p.summary}</div>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
