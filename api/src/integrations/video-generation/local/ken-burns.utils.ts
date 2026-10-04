// Pure helpers for the local "Ken Burns" clip builder (zoompan from a still).

export const KenBurns = {
  seconds: 5,
  fps: 30,
  maxWidth: 1920,
  maxHeight: 1080,
  /** The still is upscaled by this factor before zoompan to avoid sub-pixel wobble. */
  supersample: 2,
} as const;

export type KenBurnsMove = 'zoom_in' | 'zoom_out' | 'pan_right' | 'pan_left';

const MOVES: KenBurnsMove[] = ['zoom_in', 'pan_right', 'zoom_out', 'pan_left'];

/** Deterministic move selection so a re-render of the same project looks the same. */
export function pickMove(index: number): KenBurnsMove {
  return MOVES[((index % MOVES.length) + MOVES.length) % MOVES.length];
}

const even = (n: number) => Math.max(2, Math.floor(n / 2) * 2);

/** Output size: the still's aspect ratio fitted inside 1920x1080, even dimensions. */
export function fitOutputSize(
  width: number,
  height: number,
  maxW: number = KenBurns.maxWidth,
  maxH: number = KenBurns.maxHeight,
): { width: number; height: number } {
  if (!(width > 0) || !(height > 0)) return { width: maxW, height: maxH };
  const scale = Math.min(maxW / width, maxH / height);
  return { width: even(width * scale), height: even(height * scale) };
}

/** zoompan expressions (z, x, y) for a move over `frames` output frames. `on` is the output frame number. */
export function moveExpressions(move: KenBurnsMove, frames: number) {
  const center = { x: 'iw/2-(iw/zoom/2)', y: 'ih/2-(ih/zoom/2)' };
  switch (move) {
    case 'zoom_in':
      return { z: `1+0.12*on/${frames}`, ...center };
    case 'zoom_out':
      return { z: `1.12-0.12*on/${frames}`, ...center };
    case 'pan_right':
      return { z: '1.1', x: `(iw-iw/zoom)*on/${frames}`, y: center.y };
    case 'pan_left':
      return { z: '1.1', x: `(iw-iw/zoom)*(1-on/${frames})`, y: center.y };
  }
}

export function buildKenBurnsFilter(input: { width: number; height: number; move: KenBurnsMove }): string {
  const frames = KenBurns.seconds * KenBurns.fps;
  const { z, x, y } = moveExpressions(input.move, frames);
  const sw = input.width * KenBurns.supersample;
  const sh = input.height * KenBurns.supersample;
  return (
    `scale=${sw}:${sh}:flags=lanczos,setsar=1,` +
    `zoompan=z='${z}':x='${x}':y='${y}':d=${frames}:s=${input.width}x${input.height}:fps=${KenBurns.fps},` +
    `format=yuv420p`
  );
}

export function buildKenBurnsArgs(input: {
  inputFile: string;
  outFile: string;
  width: number;
  height: number;
  move: KenBurnsMove;
}): string[] {
  return [
    '-i', input.inputFile,
    '-vf', buildKenBurnsFilter(input),
    '-t', String(KenBurns.seconds),
    '-an',
    '-c:v', 'libx264',
    '-crf', '16',
    '-preset', 'veryfast',
    '-pix_fmt', 'yuv420p',
    '-r', String(KenBurns.fps),
    '-movflags', '+faststart',
    input.outFile,
  ];
}
