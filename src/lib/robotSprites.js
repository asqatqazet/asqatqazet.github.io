// Pixel-art robot inspired by a hand-painted Mona-Lisa-style robot:
// cream/ivory face, big black orb eyes, vermillion eyebrows + smile,
// black geometric collar, warm brown monk-like robe.
//
// Legend:
//   . = transparent
//   W = face shell (cream)
//   - = head outline (warm dark)
//   e = eyebrow (red)
//   * = eye (deep black orb)
//   m = mouth (red)
//   n = neck/collar (black)
//   N = neck highlight (mid grey)
//   B = robe (warm brown)
//   b = robe outline (dark brown)
//   ! = antenna LED
//   | = antenna stem
//   + = antenna joint
//   _ = ground glow

const BASE = [
  '............!...........', // 0  LED
  '............|...........', // 1  antenna stem
  '..---------+----------..', // 2  antenna joint + head top
  '.-WWWWWWWWWWWWWWWWWWWW-.', // 3  upper head curve
  '-WWWWWWWWWWWWWWWWWWWWWW-', // 4  head body
  '-WWWWWWWWWWWWWWWWWWWWWW-', // 5
  '-WWeeeWWWWWWWWWWWWeeeWW-', // 6  eyebrows
  '-WWWeWWWWWWWWWWWWWWeWWW-', // 7  eyebrow tail
  '-WWWWWWWWWWWWWWWWWWWWWW-', // 8
  '-WW****WWWWWWWWWW****WW-', // 9  eyes top
  '-WW****WWWWWWWWWW****WW-', // 10 eyes mid
  '-WW****WWWWWWWWWW****WW-', // 11 eyes mid
  '-WWW**WWWWWWWWWWWW**WWW-', // 12 eyes bottom curve
  '-WWWWWWWWWWWWWWWWWWWWWW-', // 13 cheeks
  '-WWWWWWmmmmmmmmmmWWWWWW-', // 14 mouth wide
  '.-WWWWWWmmmmmmmmWWWWWW-.', // 15 mouth curve (smile)
  '..-WWWWWWWWWWWWWWWWWW-..', // 16 chin
  '...nnnnnnnnnnnnnnnnnn...', // 17 collar top
  '...nNNNNNNNNNNNNNNNNn...', // 18 collar mid
  '..nnnnnnnnnnnnnnnnnnnn..', // 19 collar wide flare
  '..bBBBBBBBBBBBBBBBBBBb..', // 20 robe shoulders
  '.bBBBBBBBBBBBBBBBBBBBBb.', // 21
  'bBBBBBBBBBBBBBBBBBBBBBBb', // 22
  'bBBBBBBBBBBBBBBBBBBBBBBb', // 23
  'bBBBBBBBBBBBBBBBBBBBBBBb', // 24
  'bBBBBBBBBBBBBBBBBBBBBBBb', // 25
  'bBBBBBBBBBBBBBBBBBBBBBBb', // 26
  'bBBBBBBBBBBBBBBBBBBBBBBb', // 27
  'bbBBBBBBBBBBBBBBBBBBBBbb', // 28
  '________________________', // 29
];

// Closed-eye rows (used during blink) — replace rows 9–12 of BASE
const BLINK_OVERRIDES = {
  9: '-WWWWWWWWWWWWWWWWWWWWWW-',
  10: '-WW----WWWWWWWWWW----WW-',
  11: '-WWWWWWWWWWWWWWWWWWWWWW-',
  12: '-WWWWWWWWWWWWWWWWWWWWWW-',
};

// Mouth frames during talking (replace rows 14–15)
const TALK_FRAMES = [
  ['-WWWWWWmmmmmmmmmmWWWWWW-', '.-WWWWWWmmmmmmmmWWWWWW-.'], // open
  ['-WWWWWWWWWmmmmWWWWWWWWW-', '.-WWWWWWWWWWWWWWWWWWWW-.'], // small
];

export const SPRITE_W = 24;
export const SPRITE_H = 30;

const PALETTE = {
  W: '#f0e6d2', // warm cream face
  '-': '#3a2a1a', // head outline
  e: '#d44a32', // vermillion eyebrows
  '*': '#0a0805', // black eyes
  m: '#c43a22', // mouth red
  n: '#101010', // collar black
  N: '#404040', // collar highlight
  B: '#8a4f1f', // robe warm brown
  b: '#3f1f0a', // robe outline dark
  '!': '#7cffb2', // antenna LED (phosphor green)
  '|': '#1a1a1a',
  '+': '#1a1a1a',
  _: 'rgba(124,255,178,0.10)', // ground glow
  '.': null,
};

function getRow(y, state, blink, t) {
  if (blink && y in BLINK_OVERRIDES) return BLINK_OVERRIDES[y];
  if (state === 'talking' && (y === 14 || y === 15)) {
    const phase = Math.floor(t / 130) % 2;
    return TALK_FRAMES[phase][y - 14];
  }
  return BASE[y];
}

export function drawRobot(ctx, scale, state, t, _lookOffset, blink) {
  for (let y = 0; y < BASE.length; y++) {
    const line = getRow(y, state, blink, t);
    for (let x = 0; x < line.length; x++) {
      let ch = line[x];
      // Antenna LED color shifts with state
      if (ch === '!') {
        let colour = PALETTE['!'];
        if (state === 'thinking') colour = '#ffe066';
        else if (state === 'talking') colour = '#ff5fd2';
        ctx.fillStyle = colour;
        ctx.fillRect(x * scale, y * scale, scale, scale);
        continue;
      }
      const colour = PALETTE[ch];
      if (!colour) continue;
      ctx.fillStyle = colour;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

// Wave action — raise a small cream-coloured "hand" at robe shoulder
export function drawWave(ctx, scale, t) {
  const phase = Math.floor(t / 250) % 2;
  const handX = phase === 0 ? 21 : 22;
  const handY = 19;
  ctx.fillStyle = PALETTE['W'];
  ctx.fillRect(handX * scale, handY * scale, scale, scale);
  ctx.fillRect(handX * scale, (handY + 1) * scale, scale, scale);
  ctx.fillRect((handX - 1) * scale, (handY + 1) * scale, scale, scale);
  ctx.fillStyle = PALETTE['-'];
  ctx.fillRect((handX - 1) * scale, handY * scale, scale, scale);
}
