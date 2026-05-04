import skills from '../data/skills.json';
import { SectionHeader } from './About.jsx';

const GROUPS = [
  { key: 'languages', label: 'Languages', symbol: '<>' },
  { key: 'web', label: 'Web / Backend', symbol: '{}' },
  { key: 'ml', label: 'ML / AI', symbol: '∇' },
  { key: 'data', label: 'Data & Storage', symbol: '⊞' },
  { key: 'cloud', label: 'Cloud / DevOps', symbol: '☁' },
  { key: 'security', label: 'Security', symbol: '⌬' },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen w-full snap-start px-4 sm:px-10 py-20 max-w-5xl mx-auto">
      <SectionHeader tag="04" title="skills.json" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GROUPS.map((g) => (
          <div key={g.key} className="glow-border bg-[var(--color-bg-soft)]/60 rounded-md p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[var(--color-accent)] font-display text-2xl">{g.symbol}</span>
              <h3 className="text-[var(--color-fg)] font-display tracking-wide text-xl">{g.label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills[g.key].map((s) => (
                <span
                  key={s}
                  className="text-sm px-2.5 py-1 border border-[var(--color-rule)] hover:border-[var(--color-accent-dim)] hover:text-[var(--color-accent)] transition-colors text-[var(--color-fg-dim)] rounded font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
