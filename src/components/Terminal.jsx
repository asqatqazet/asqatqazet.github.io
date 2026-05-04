import { useEffect, useRef, useState } from 'react';
import { runCommand, COMMAND_NAMES } from '../lib/commands.js';
import AudioEngine from '../lib/audio.js';
import useLocalStorage from '../lib/useLocalStorage.js';

const PROMPT = 'asihati@hh:~$';

const INITIAL = [
  { type: 'banner' },
  { type: 'system', text: 'SYSTEM INITIALIZED. Welcome to Asihati Hazaiti\'s terminal.' },
  { type: 'intro', text: 'Software & Data Engineer @ Simplience GmbH · MSc IAS @ U Hamburg' },
  { type: 'intro', text: 'Type `help` for commands. Or scroll down for the recruiter view.' },
];

export default function Terminal({ onTyping, onCommand, onScrollTo, onSetTheme, onSetSound, onRobotSay, onOpenResume }) {
  const [output, setOutput] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useLocalStorage('asihati.cli.history', []);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  const host = {
    reset: () => setOutput([]),
    scrollTo: (id) => onScrollTo?.(id),
    setTheme: (t) => onSetTheme?.(t),
    setSound: (v) => onSetSound?.(v),
    robotSay: (line) => onRobotSay?.(line),
    openResume: () => onOpenResume?.(),
  };

  const submit = (raw) => {
    const lines = runCommand(raw, host);
    const echo = { type: 'echo', text: `${PROMPT} ${raw}` };
    if (lines === null) {
      // clear or no-op
      if (raw.trim() === 'clear' || raw.trim() === 'cls') return;
      setOutput((prev) => [...prev, echo]);
      return;
    }
    const items = lines.map((l) => ({ type: 'line', text: l }));
    setOutput((prev) => [...prev, echo, ...items]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const raw = input;
      if (raw.trim()) {
        setCmdHistory((h) => [...h.slice(-49), raw]);
        onCommand?.(raw);
      }
      submit(raw);
      setInput('');
      setHistIdx(-1);
      AudioEngine.beep(440, 0.05);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] || '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= cmdHistory.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(cmdHistory[next] || '');
      }
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(trimmed));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        setOutput((prev) => [
          ...prev,
          { type: 'echo', text: `${PROMPT} ${input}` },
          { type: 'line', text: matches.join('   ') },
        ]);
      }
      return;
    }
    if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setOutput([]);
      return;
    }
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setOutput((prev) => [...prev, { type: 'echo', text: `${PROMPT} ${input}^C` }]);
      setInput('');
      return;
    }
    AudioEngine.keyPress();
    onTyping?.(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => onTyping?.(false), 600);
  };

  const renderItem = (item, i) => {
    if (item.type === 'banner') {
      return (
        <pre key={i} className="text-[var(--color-accent)] font-display text-base sm:text-lg leading-tight whitespace-pre">
{`    _    ____ ___ _   _    _  _____ ___      _____  _______
   / \\  / ___|_ _| | | |  / \\|_   _|_ _|    | ____| \\ \\/ / ____|
  / _ \\ \\___ \\| || |_| | / _ \\ | |  | |     |  _|    \\  /|  _|
 / ___ \\ ___) | ||  _  |/ ___ \\| |  | |  _  | |___   /  \\| |___
/_/   \\_\\____/___|_| |_/_/   \\_\\_| |___|(_) |_____| /_/\\_\\_____|`}
        </pre>
      );
    }
    if (item.type === 'system') {
      return <div key={i} className="text-[var(--color-amber)]">{item.text}</div>;
    }
    if (item.type === 'intro') {
      return <div key={i} className="text-[var(--color-fg-dim)]">{item.text}</div>;
    }
    if (item.type === 'echo') {
      return <div key={i} className="text-[var(--color-cyan)] crt-glow">{item.text}</div>;
    }
    return <div key={i} className="whitespace-pre-wrap text-[var(--color-fg)]">{item.text}</div>;
  };

  return (
    <div
      className="glow-border bg-[var(--color-bg-soft)]/80 backdrop-blur-sm rounded-lg p-4 sm:p-5 max-w-2xl w-full font-mono text-sm sm:text-[15px] flex flex-col"
      style={{ height: 'min(560px, 70vh)' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-rule)]">
        <span className="w-3 h-3 rounded-full bg-[var(--color-magenta)]/70" />
        <span className="w-3 h-3 rounded-full bg-[var(--color-amber)]/70" />
        <span className="w-3 h-3 rounded-full bg-[var(--color-accent)]/80" />
        <span className="ml-3 text-[var(--color-fg-dim)] text-xs">asihati.exe — terminal</span>
      </div>
      <div
        ref={outputRef}
        aria-live="polite"
        className="flex-1 overflow-y-auto pt-3 pr-2 leading-relaxed"
      >
        {output.map(renderItem)}
        <div className="flex gap-2 mt-2">
          <span className="text-[var(--color-accent)] crt-glow shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="terminal-input flex-1"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
