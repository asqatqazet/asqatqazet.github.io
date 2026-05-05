import { useState, useEffect, useRef, useCallback } from "react";
import AudioEngine from "./audio.js";
import { COMMANDS, HEADER_ASCII } from "./commands.js";
import PixelAvatar from "./robot.jsx";
import TelemetryBar from "./telemetry.jsx";

// Friendly multilingual + bio responses fired when the user clicks the avatar.
// Cycles through; first click is special.
const A_RESPONSES = [
  { log: "> [System] Memory access: bio archive.", say: "I run on coffee and gradient descent." },
  { log: "> [System] Geo-locator online.", say: "Hamburg → 53.55°N, 9.99°E. Send rain." },
  { log: "> [System] Polyglot subroutine engaged.", say: "Hello / 你好 / Сәлем / ياخشىمۇسىز / Hallo." },
  { log: "> [System] Project pointer dereferenced.", say: "Ask me about PoSyMed4U. It reads patient genomes." },
  { log: "> [System] Self-awareness module nominal.", say: "MSc Intelligent Adaptive Systems. Pretty meta for a robot." },
  { log: "> [System] Origin memory loaded.", say: "Born in Xinjiang. Raised in Tianjin. Debugging in Hamburg." },
  { log: "> [System] Stack inspection complete.", say: "Spring Boot keeps me warm in German winters." },
  { log: "> [System] Compliance audit passed.", say: "I once remediated a thousand vulnerabilities. Don't tell legal." },
  { log: "> [System] Genomics module active.", say: "Bio-inspired AI is just plagiarizing 4 billion years of R&D." },
  { log: "> [System] Suggestion engine engaged.", say: "Type `help` if you're lost. I get lost too sometimes." },
  { log: "> [System] Whimsy patch applied.", say: "Fun fact: I dream in Bayer dither." },
  { log: "> [System] Ego subroutine loaded.", say: "Five languages. Zero emojis. Trade-offs." },
  { log: "> [System] Migration log opened.", say: "I migrated production data to VTEX. Twice. Don't ask." },
  { log: "> [System] Auth module reflected.", say: "OAuth2 + WebAuthn = passwords are so 2010." },
  { log: "> [System] Recruiter mode activated.", say: "Type `resume` to download the CV. Or just keep typing." },
];

const A_ACTIONS = ["think", "nod", "lean", "bow", "shake-head"];

const ABOUT_LINES = [
  '"Five languages. Three cities.',
  ' Two continents. One terminal.',
  ' I write code that learns,',
  ' I read genomes for a living,',
  ' and I dream in Bayer dither."',
];

function App() {
  const [history, setHistory] = useState([
    { type: "ascii", text: HEADER_ASCII },
    { type: "system", text: "SYSTEM INITIALIZED. Welcome to Asihati Hazaiti's personal terminal." },
    { type: "intro", text: "Software & Data Engineer @ Simplience GmbH" },
    { type: "intro", text: "MSc Intelligent Adaptive Systems @ University of Hamburg" },
    { type: "system", text: 'Type "help" to see available commands. Click A to talk.' },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [avatarState, setAvatarState] = useState("idle");
  const [speech, setSpeech] = useState("");
  const [action, setAction] = useState("idle");
  const [lookTarget, setLookTarget] = useState({ x: 0, y: 0 });
  const [typingIntensity, setTypingIntensity] = useState(0);
  const [creepLevel] = useState(0); // unused, kept for prop compatibility
  const [showAbout, setShowAbout] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundInitialized, setSoundInitialized] = useState(false);

  const clickCountRef = useRef(0);
  const glitchRef = useRef(0);
  const speechTimeoutRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const stateResetRef = useRef(null);
  const actionResetRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const idleStageRef = useRef(0);

  const initAudio = useCallback(() => {
    if (!soundInitialized) {
      AudioEngine.init();
      setSoundInitialized(true);
      setSoundOn(true);
      AudioEngine.powerOn();
    } else {
      AudioEngine.resume();
    }
  }, [soundInitialized]);

  const toggleSound = () => {
    if (!soundInitialized) { initAudio(); return; }
    const next = !soundOn;
    setSoundOn(next);
    AudioEngine.setEnabled(next);
    if (next) AudioEngine.beep(660, 0.1);
    else AudioEngine.beep(220, 0.1);
  };

  const speak = (text, duration) => {
    setSpeech("");
    setTimeout(() => setSpeech(text), 10);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(
      () => setSpeech(""),
      duration || text.length * 50 + 2500
    );
  };

  const triggerAction = (a, ms = 1800) => {
    setAction(a);
    if (actionResetRef.current) clearTimeout(actionResetRef.current);
    actionResetRef.current = setTimeout(() => setAction("idle"), ms);
  };

  const resetState = () => {
    if (stateResetRef.current) clearTimeout(stateResetRef.current);
    stateResetRef.current = setTimeout(() => setAvatarState("idle"), 2500);
  };

  useEffect(() => {
    endRef.current?.scrollTo?.({ top: endRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const wake = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (idleStageRef.current > 0) {
      idleStageRef.current = 0;
      setAvatarState("idle");
      setAction("startled");
      setTimeout(() => setAction("idle"), 1200);
      AudioEngine?.powerOn();
      speak("...oh. You're back.", 2500);
    }
  }, []);

  useEffect(() => {
    const onMove = () => wake();
    const onKey = () => wake();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onMove);
    };
  }, [wake]);

  useEffect(() => {
    const iv = setInterval(() => {
      const idle = Date.now() - lastActivityRef.current;
      if (idle > 60000 && idleStageRef.current < 2) {
        idleStageRef.current = 2;
        setAvatarState("sleep");
        setAction("sleep");
        AudioEngine?.powerDown();
      } else if (idle > 25000 && idleStageRef.current < 1) {
        idleStageRef.current = 1;
        setAction("yawn");
        AudioEngine?.yawn();
        speak("*yawn* ...where did everyone go.", 3000);
        setTimeout(() => { if (idleStageRef.current === 1) setAction("idle"); }, 1800);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (clickCountRef.current === 0) speak('Human. Talk to me. Click, or type "help".');
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    if (!soundInitialized) initAudio();
    const val = e.target.value;
    const delta = val.length - input.length;
    setInput(val);
    setAvatarState("typing");
    setLookTarget({ x: -0.6, y: 0.85 });
    setTypingIntensity((v) => Math.min(1, v + 0.3));
    if (delta > 0) AudioEngine?.keyPress();
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setAvatarState("idle");
      setLookTarget({ x: 0, y: 0 });
      setTypingIntensity(0);
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const n = Math.min(cmdHistory.length - 1, cmdHistoryIdx + 1);
      setCmdHistoryIdx(n);
      setInput(cmdHistory[cmdHistory.length - 1 - n] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(-1, cmdHistoryIdx - 1);
      setCmdHistoryIdx(n);
      setInput(n === -1 ? "" : cmdHistory[cmdHistory.length - 1 - n] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS);
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) { setInput(match); AudioEngine?.beep(1200, 0.04); }
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!soundInitialized) initAudio();
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    setCmdHistory((h) => [...h, raw]);
    setCmdHistoryIdx(-1);

    const newHist = [...history, { type: "user", text: `guest@asihati-hazaiti:~$ ${raw}` }];
    AudioEngine?.beep(440, 0.04);

    const handler = COMMANDS[cmd];

    if (!handler) {
      newHist.push({
        type: "error",
        text: `COMMAND NOT FOUND: ${cmd}\nType "help" to see available commands.`,
      });
      speak('Unknown command. Try "help".');
      setAvatarState("error");
      triggerAction("shake-head", 1500);
      AudioEngine?.error();
      resetState();
      setHistory(newHist); setInput("");
      return;
    }

    const res = handler();

    if (res.special?.kind === "clear") { setHistory([]); setInput(""); return; }
    if (res.special?.kind === "open" && res.special.url) {
      window.open(res.special.url, "_blank", "noopener,noreferrer");
    }

    if (res.out) newHist.push({ type: res.type || "output", text: res.out });
    if (res.speech) speak(res.speech);
    if (res.action) triggerAction(res.action, 1800);
    if (res.state) setAvatarState(res.state);
    if (res.glitch) glitchRef.current = res.glitch;
    if (res.sfx === "scan") AudioEngine?.scan();
    else if (res.sfx === "error") AudioEngine?.error();
    else if (res.state === "success") AudioEngine?.success();

    setHistory(newHist); setInput("");
    resetState();
  };

  const handleAvatarClick = () => {
    if (!soundInitialized) initAudio();
    clickCountRef.current += 1;
    const n = clickCountRef.current;

    if (n === 1) {
      setHistory((prev) => [
        ...prev,
        { type: "system", text: "> [System] First contact established. Unit A is online." },
      ]);
      speak("I am A — a friendly mascot trained on Asihati's portfolio.");
      setAvatarState("success");
      triggerAction("salute", 1500);
      AudioEngine?.success();
      resetState();
      return;
    }

    const idx = (n - 2) % A_RESPONSES.length;
    const r = A_RESPONSES[idx];
    setHistory((prev) => [...prev, { type: "system", text: r.log }]);
    speak(r.say);
    triggerAction(A_ACTIONS[idx % A_ACTIONS.length], 1800);
    setAvatarState("success");
    resetState();
  };

  const interactionPulse = useRef(0);
  useEffect(() => {
    interactionPulse.current = Math.min(
      1,
      interactionPulse.current + (typingIntensity > 0 ? 0.3 : -0.05)
    );
  }, [typingIntensity]);

  return (
    <>
      <div className="crt-overlay"></div>
      <div className="crt-flicker"></div>
      <div className="crt-vignette"></div>

      {showAbout && (
        <div
          onClick={() => setShowAbout(false)}
          style={{
            position: "fixed", inset: 0, backgroundColor: "#000", zIndex: 90,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              maxWidth: 600, padding: "48px 40px", border: "1px solid #333",
              textAlign: "center", color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: 13, color: "#555", marginBottom: 32,
                letterSpacing: 3, textTransform: "uppercase",
              }}
            >
              Manifesto
            </div>
            <div style={{ fontSize: 18, lineHeight: 2.2, color: "#ddd", fontStyle: "italic" }}>
              {ABOUT_LINES.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
            <div style={{ marginTop: 40, fontSize: 12, color: "#444" }}>
              [ click anywhere to close ]
            </div>
          </div>
        </div>
      )}

      <div
        className="h-screen w-screen flex flex-col p-4 md:p-6 crt-text relative z-10"
        data-screen-label="01 Main"
      >
        <header
          className="w-full flex items-center justify-between gap-2 md:gap-6 border-b border-gray-800 shrink-0 text-sm md:text-base font-bold px-2"
          style={{ height: "8%" }}
        >
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setShowAbout(true); }}
              className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition-all cursor-pointer"
            >
              [ ABOUT ]
            </a>
            <a
              href="https://github.com/asqatqazet"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition-all"
            >
              [ GITHUB ]
            </a>
            <a
              href="/assets/Asihati_Hazaiti_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition-all"
            >
              [ RESUME ]
            </a>
            <a
              href="https://linkedin.com/in/asihati-hazaiti"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded transition-all"
            >
              [ LINKEDIN ]
            </a>
          </div>
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded border text-xs font-mono transition-all ${
              soundOn
                ? "text-white border-gray-500"
                : "text-gray-600 border-gray-800 hover:text-gray-300"
            }`}
          >
            [ ♪ SOUND: {soundOn ? "ON" : "OFF"} ]
          </button>
        </header>

        <div
          className="w-full flex flex-col md:flex-row gap-4 md:gap-6 pt-4 pb-1"
          style={{ height: "92%" }}
        >
          <div
            className="flex-1 flex flex-col h-full bg-black border border-gray-800 rounded shadow-2xl overflow-hidden relative cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 px-4 pt-3 shrink-0">
              <span className="text-gray-300 font-bold crt-title text-xl">ASIHATI_OS_v1.0</span>
              <span className="text-gray-500 text-xs">● ONLINE</span>
            </div>

            <div
              ref={endRef}
              className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-2 px-4 py-3"
            >
              {history.map((line, i) => {
                if (line.type === "ascii") {
                  return (
                    <div key={i} className="w-full overflow-x-auto pb-2">
                      <pre
                        className="whitespace-pre text-gray-300 inline-block"
                        style={{
                          fontFamily: "Consolas, Monaco, 'Lucida Console', monospace",
                          fontSize: "clamp(6px, 1.1vw, 13px)",
                          lineHeight: "1",
                        }}
                      >
                        {line.text}
                      </pre>
                    </div>
                  );
                }
                if (line.type === "intro") {
                  return (
                    <div
                      key={i}
                      className="text-base md:text-lg font-bold text-white whitespace-pre-wrap break-words tracking-wide"
                    >
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={`text-sm whitespace-pre-wrap break-words ${
                      line.type === "error"
                        ? "text-gray-400"
                        : line.type === "system"
                        ? "text-gray-300"
                        : line.type === "user"
                        ? "text-white"
                        : "text-gray-100"
                    }`}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleCommand}
              className="flex items-center px-4 py-3 border-t border-gray-800 shrink-0 gap-2"
            >
              <span className="text-white whitespace-nowrap text-sm">
                guest@asihati-hazaiti:<span className="text-gray-500">~</span>$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="type command... [Tab] autocomplete  [↑] history"
                className="flex-1 bg-transparent border-none outline-none text-white crt-text placeholder-gray-700 text-sm"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
              <span
                className="w-2 h-4 bg-white inline-block"
                style={{ animation: "blink-cursor 1s infinite" }}
              ></span>
            </form>
          </div>

          <div className="flex-1 h-full bg-black border border-gray-800 rounded shadow-2xl relative overflow-hidden flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <PixelAvatar
                avatarState={avatarState}
                onAvatarClick={handleAvatarClick}
                glitchRef={glitchRef}
                speech={speech}
                creepLevel={creepLevel}
                action={action}
                lookTarget={lookTarget}
                typingIntensity={typingIntensity}
              />
            </div>
            <TelemetryBar
              avatarState={avatarState}
              creepLevel={creepLevel}
              interactionPulse={interactionPulse.current}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
