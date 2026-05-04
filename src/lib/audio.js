// Lightweight WebAudio synth engine. No audio assets — every sound is generated.
// Initialized lazily inside a user gesture to satisfy autoplay policies.

class AudioEngineImpl {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.18;
      this.master.connect(this.ctx.destination);
      this.initialized = true;
    } catch {
      // ignore
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(on) {
    this.enabled = on;
    if (on) this.resume();
  }

  isEnabled() {
    return this.enabled && this.initialized;
  }

  _envelope(node, attack = 0.005, release = 0.05, peak = 1) {
    const t = this.ctx.currentTime;
    node.gain.cancelScheduledValues(t);
    node.gain.setValueAtTime(0.0001, t);
    node.gain.exponentialRampToValueAtTime(peak, t + attack);
    node.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  }

  _tone({ type = 'square', freq = 440, attack = 0.005, release = 0.05, gain = 0.5, filter }) {
    if (!this.isEnabled()) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    let last = env;
    if (filter) {
      const f = this.ctx.createBiquadFilter();
      f.type = filter.type || 'lowpass';
      f.frequency.value = filter.freq || 1200;
      f.Q.value = filter.q || 1;
      env.connect(f);
      last = f;
    }
    osc.connect(env);
    last.connect(this.master);
    this._envelope(env, attack, release, gain);
    const t = this.ctx.currentTime;
    osc.start(t);
    osc.stop(t + attack + release + 0.02);
  }

  keyPress() {
    this._tone({ type: 'square', freq: 880 + Math.random() * 80, attack: 0.002, release: 0.04, gain: 0.35 });
  }

  servoClick(pitch = 1) {
    this._tone({
      type: 'sawtooth',
      freq: 320 * pitch,
      attack: 0.002,
      release: 0.06,
      gain: 0.4,
      filter: { type: 'lowpass', freq: 1100, q: 6 },
    });
  }

  beep(freq = 660, duration = 0.1) {
    this._tone({ type: 'sine', freq, attack: 0.005, release: duration, gain: 0.45 });
  }

  powerOn() {
    if (!this.isEnabled()) return;
    [392, 523, 659].forEach((f, i) => {
      setTimeout(() => this._tone({ type: 'triangle', freq: f, attack: 0.01, release: 0.18, gain: 0.4 }), i * 90);
    });
  }

  glitch() {
    if (!this.isEnabled()) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this._tone({
        type: 'square',
        freq: 100 + Math.random() * 600,
        attack: 0.001,
        release: 0.04,
        gain: 0.35,
      }), i * 50);
    }
  }
}

const AudioEngine = new AudioEngineImpl();
export default AudioEngine;
