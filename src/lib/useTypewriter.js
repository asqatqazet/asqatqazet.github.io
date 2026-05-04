import { useEffect, useRef, useState } from 'react';

export default function useTypewriter(text, { speed = 22, onTick, onDone } = {}) {
  const [out, setOut] = useState('');
  const idxRef = useRef(0);

  useEffect(() => {
    setOut('');
    idxRef.current = 0;
    if (!text) return undefined;
    const id = setInterval(() => {
      idxRef.current += 1;
      const next = text.slice(0, idxRef.current);
      setOut(next);
      onTick?.(idxRef.current);
      if (idxRef.current >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return out;
}
