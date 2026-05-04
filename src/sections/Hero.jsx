import { useCallback, useEffect, useRef, useState } from 'react';
import Terminal from '../components/Terminal.jsx';
import Robot from '../components/Robot.jsx';
import SpeechBubble from '../components/SpeechBubble.jsx';
import dialogue from '../data/dialogue.json';
import AudioEngine from '../lib/audio.js';

export default function Hero({ onSetTheme, onSetSound, onOpenResume }) {
  const [robotState, setRobotState] = useState('idle');
  const [robotAction, setRobotAction] = useState('wave');
  const [robotBlink, setRobotBlink] = useState(false);
  const [robotLook, setRobotLook] = useState({ x: 0, y: 0 });
  const [robotSpeech, setRobotSpeech] = useState('Hello / 你好 / Сәлем / ياخشىمۇسىز / Hallo.');
  const speechTimerRef = useRef(null);
  const stateTimerRef = useRef(null);
  const actionTimerRef = useRef(null);
  const lastDialogueIdxRef = useRef(-1);

  // First-load wave -> idle
  useEffect(() => {
    const id = setTimeout(() => setRobotAction('idle'), 1800);
    return () => clearTimeout(id);
  }, []);

  // Idle blink loop
  useEffect(() => {
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setRobotBlink(true);
      setTimeout(() => alive && setRobotBlink(false), 120);
      const next = 4000 + Math.random() * 3000;
      setTimeout(tick, next);
    };
    const id = setTimeout(tick, 3000);
    return () => { alive = false; clearTimeout(id); };
  }, []);

  // Auto-clear speech after delay
  const speak = useCallback((text) => {
    setRobotSpeech('');
    setTimeout(() => setRobotSpeech(text), 30);
    setRobotState('talking');
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    speechTimerRef.current = setTimeout(() => setRobotSpeech(''), text.length * 28 + 3000);
    stateTimerRef.current = setTimeout(() => setRobotState('idle'), text.length * 28 + 1500);
  }, []);

  const triggerAction = useCallback((a, ms = 1500) => {
    setRobotAction(a);
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    actionTimerRef.current = setTimeout(() => setRobotAction('idle'), ms);
  }, []);

  // Mouse-track
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth - 160;
      const cy = window.innerHeight - 200;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      const ox = Math.max(-1, Math.min(1, dx * 4));
      const oy = Math.max(-1, Math.min(1, dy * 4));
      setRobotLook({ x: ox, y: oy });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleRobotClick = () => {
    AudioEngine.servoClick();
    let idx;
    do {
      idx = Math.floor(Math.random() * dialogue.length);
    } while (idx === lastDialogueIdxRef.current && dialogue.length > 1);
    lastDialogueIdxRef.current = idx;
    speak(dialogue[idx]);
    triggerAction('wave');
  };

  const handleTyping = (typing) => {
    setRobotState(typing ? 'thinking' : 'idle');
  };

  const handleCommand = (raw) => {
    if (raw.includes('robot')) triggerAction('wave');
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="boot"
      className="relative min-h-screen w-full snap-start flex items-center justify-start px-4 sm:px-10 pt-10 pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(124,255,178,0.06),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(255,179,71,0.04),transparent_60%)]" />
      <Terminal
        onTyping={handleTyping}
        onCommand={handleCommand}
        onScrollTo={handleScrollTo}
        onSetTheme={onSetTheme}
        onSetSound={onSetSound}
        onRobotSay={speak}
        onOpenResume={onOpenResume}
      />
      <Robot
        state={robotState}
        blink={robotBlink}
        lookTarget={robotLook}
        action={robotAction}
        onClick={handleRobotClick}
      />
      <SpeechBubble text={robotSpeech} />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-[var(--color-fg-dim)] font-mono opacity-60 animate-pulse">
        ↓ scroll for the recruiter view
      </div>
    </section>
  );
}
