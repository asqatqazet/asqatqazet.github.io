import profile from '../data/profile.json';

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full snap-start px-4 sm:px-10 py-20 max-w-5xl mx-auto">
      <SectionHeader tag="01" title="about.txt" />
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--color-accent)] opacity-10 blur-2xl" />
          <img
            src={profile.portrait}
            alt={profile.name}
            className="relative w-full rounded border border-[var(--color-accent-dim)] glow-border"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl sm:text-4xl font-display text-[var(--color-fg)] crt-glow">
            {profile.name}
            <span className="block text-base font-mono text-[var(--color-accent)] mt-1">
              {profile.title} · {profile.location}
            </span>
          </h3>
          <p className="text-[var(--color-fg-dim)] leading-relaxed">{profile.bio}</p>
          <p className="text-sm text-[var(--color-fg-dim)]">
            <span className="text-[var(--color-amber)]">$</span> tagline → <span className="text-[var(--color-accent)]">{profile.tagline}</span>
          </p>
          <div className="flex gap-3 flex-wrap pt-4">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-[var(--color-accent-dim)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors text-[var(--color-accent)] font-mono text-sm rounded"
            >
              ↓ download_resume.pdf
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-2 border border-[var(--color-rule)] hover:border-[var(--color-accent-dim)] transition-colors text-[var(--color-fg)] font-mono text-sm rounded"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ tag, title }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="text-[var(--color-fg-dim)] font-mono text-sm">{tag}.</span>
      <h2 className="text-2xl sm:text-3xl font-display text-[var(--color-accent)] crt-glow">
        {title}
      </h2>
      <span className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent-dim)] to-transparent" />
    </div>
  );
}
