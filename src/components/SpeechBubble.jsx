import useTypewriter from '../lib/useTypewriter.js';

export default function SpeechBubble({ text, onTick }) {
  const out = useTypewriter(text, { speed: 22, onTick });
  if (!text) return null;
  return (
    <div className="hidden md:block absolute bottom-[280px] right-[8%] max-w-[280px] z-30 pointer-events-none">
      <div className="bg-[var(--color-bg)] border border-[var(--color-accent-dim)] rounded px-3 py-2 text-sm text-[var(--color-fg)] font-mono relative crt-glow">
        <span>{out}</span>
        {out.length < text.length && <span className="animate-pulse">_</span>}
        <div
          className="absolute -bottom-2 right-8 w-0 h-0"
          style={{
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '8px solid var(--color-accent-dim)',
          }}
        />
      </div>
    </div>
  );
}
