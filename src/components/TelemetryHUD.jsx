import { useEffect, useState } from 'react';

export default function TelemetryHUD({ soundOn, onToggleSound }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const tz = 'Europe/Berlin';
  const hh = time.toLocaleTimeString('en-GB', { timeZone: tz, hour12: false });

  return (
    <div className="fixed top-3 right-3 z-40 hidden md:flex items-center gap-3 text-xs text-[var(--color-fg-dim)] font-mono pointer-events-none">
      <span className="opacity-70">// HH/DE</span>
      <span className="opacity-70">{hh} CET</span>
      <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" style={{ animation: 'pulse-dim 1.6s ease-in-out infinite' }} />
      <button
        type="button"
        onClick={onToggleSound}
        className="pointer-events-auto px-2 py-1 border border-[var(--color-rule)] rounded hover:border-[var(--color-accent-dim)] transition-colors"
        aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
      >
        sound:{soundOn ? 'on' : 'off'}
      </button>
    </div>
  );
}
