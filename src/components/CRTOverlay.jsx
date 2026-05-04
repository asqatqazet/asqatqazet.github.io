import { useEffect, useState } from 'react';

export default function CRTOverlay() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('crt') === 'off') setEnabled(false);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="crt-vignette" aria-hidden />
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-flicker" aria-hidden />
    </>
  );
}
