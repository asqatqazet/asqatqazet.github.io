import profile from '../data/profile.json';
import { SectionHeader } from './About.jsx';

const LEVELS = {
  'Native': 100,
  'C1 Proficient': 92,
  'Proficient': 80,
  'B1 Intermediate': 55,
};

export default function Languages() {
  return (
    <section id="langs" className="min-h-screen w-full snap-start px-4 sm:px-10 py-20 max-w-5xl mx-auto">
      <SectionHeader tag="05" title="languages.cfg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profile.languages.map((l) => {
          const pct = LEVELS[l.level] || 60;
          return (
            <div key={l.code} className="glow-border bg-[var(--color-bg-soft)]/60 rounded-md p-5">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="text-2xl font-display text-[var(--color-fg)] tracking-wide">
                  {l.name}
                </h3>
                <span className="text-xs font-mono text-[var(--color-fg-dim)]">[{l.code}]</span>
              </div>

              <div className="text-xs font-mono text-[var(--color-fg-dim)] mb-2">{l.level}</div>
              <div className="h-1.5 bg-[var(--color-rule)] rounded overflow-hidden">
                <div
                  className="h-full bg-[var(--color-accent)]"
                  style={{ width: `${pct}%` }}
                  aria-label={`Proficiency ${pct}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
