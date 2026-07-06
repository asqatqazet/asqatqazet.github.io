import profile from '../data/profile.json';
import { SectionHeader } from './About.jsx';

const SIG = `       ,---.
      / o o \\
      | (_) |     :: signing off ::
      \\_____/
       |||||
      /-----\\`;

export default function Contact() {
  return (
    <section id="contact" className="w-full snap-start px-4 sm:px-10 py-20 max-w-4xl mx-auto">
      <SectionHeader tag="06" title="contact.sh" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-3 font-mono">
          <Row label="email" value={profile.email} href={`mailto:${profile.email}`} />
          <Row label="github" value={`github.com/${profile.github}`} href={`https://github.com/${profile.github}`} />
          <Row label="linkedin" value={`linkedin.com/in/${profile.linkedin}`} href={`https://www.linkedin.com/in/${profile.linkedin}`} />
          <Row label="location" value={profile.location} />
          <Row label="resume" value="Asihati_Hazaiti_Resume.pdf" href={profile.resumeUrl} />
        </div>
        <pre className="text-[var(--color-accent)] font-display text-base leading-tight whitespace-pre">{SIG}</pre>
      </div>
    </section>
  );
}

function Row({ label, value, href }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-[var(--color-rule)] py-2">
      <span className="text-[var(--color-fg-dim)] w-24 shrink-0">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:text-[var(--color-cyan)] transition-colors break-all">
          {value}
        </a>
      ) : (
        <span className="text-[var(--color-fg)]">{value}</span>
      )}
    </div>
  );
}
