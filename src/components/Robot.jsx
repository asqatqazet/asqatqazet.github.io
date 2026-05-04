import { useEffect, useRef } from 'react';
import { drawRobot, drawWave, SPRITE_W, SPRITE_H } from '../lib/robotSprites.js';
import AudioEngine from '../lib/audio.js';

const SCALE = 8; // 24x30 sprite × 8 = 192x240 CSS px

export default function Robot({ state, blink, lookTarget, action, onClick }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(state);
  const blinkRef = useRef(blink);
  const lookRef = useRef(lookTarget || { x: 0, y: 0 });
  const actionRef = useRef(action || 'idle');

  stateRef.current = state;
  blinkRef.current = blink;
  lookRef.current = lookTarget || { x: 0, y: 0 };
  actionRef.current = action || 'idle';

  useEffect(() => {
    if (action && action !== 'idle') {
      AudioEngine.servoClick(0.85 + Math.random() * 0.3);
    }
  }, [action]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    canvas.width = SPRITE_W * SCALE;
    canvas.height = SPRITE_H * SCALE;

    let raf;
    const render = (t) => {
      if (document.hidden) {
        raf = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Floor glow under robot
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height - 8, 4,
        canvas.width / 2, canvas.height - 8, canvas.width / 2.2
      );
      grad.addColorStop(0, 'rgba(124,255,178,0.18)');
      grad.addColorStop(1, 'rgba(124,255,178,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vertical bob
      const bob = Math.round(Math.sin(t / 600) * 1) * SCALE;
      ctx.save();
      ctx.translate(0, bob);

      drawRobot(ctx, SCALE, stateRef.current, t, lookRef.current, blinkRef.current);

      if (actionRef.current === 'wave') {
        drawWave(ctx, SCALE, t);
      }

      ctx.restore();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Pixel-art robot mascot. Click to talk."
      className="hidden md:block absolute right-[6%] bottom-[8%] z-20 cursor-pointer bg-transparent border-0 p-0 hover:scale-105 transition-transform"
      style={{ width: SPRITE_W * SCALE, height: SPRITE_H * SCALE }}
    >
      <canvas
        ref={canvasRef}
        className="pixelated"
        style={{ width: '100%', height: '100%' }}
      />
    </button>
  );
}
