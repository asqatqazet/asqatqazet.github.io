import profile from '../data/profile.json';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-10 py-10 border-t border-[var(--color-rule)] text-xs font-mono text-[var(--color-fg-dim)] flex flex-col sm:flex-row justify-between items-center gap-3">
      <div>
        // built with vite + react · pixel-art robot in canvas · CRT in CSS
      </div>
      <div>
        <a
          href={`https://github.com/${profile.github}/${profile.github}.github.io`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-accent)]"
        >
          source ↗
        </a>
        <span className="mx-2">·</span>
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </div>
    </footer>
  );
}
