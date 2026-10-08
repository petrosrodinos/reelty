// The soundtracks users can pick from. Each id is the file name of a bundled CC0 recording in
// `api/assets/soundtracks/<id>.mp3` (credits in that folder's CREDITS.md).
export interface SoundtrackInfo {
  id: string;
  name: string;
  description: string;
}

export const SOUNDTRACKS: readonly SoundtrackInfo[] = [
  { id: 'ambient', name: 'Calm Piano', description: 'Soft, spacious piano. A safe fit for any property.' },
  { id: 'uplifting', name: 'Bright Morning', description: 'Light and uplifting ambient. Suits sunny, modern spaces.' },
  { id: 'emotional', name: 'Warm Welcome', description: 'Emotional and cinematic. Great for family homes.' },
  { id: 'modern', name: 'Modern Upbeat', description: 'Positive and energetic. Suits new builds and city apartments.' },
  { id: 'acoustic', name: 'Acoustic Garden', description: 'Gentle guitar and keys. Suits cosy homes with outdoor space.' },
];

export const DEFAULT_SOUNDTRACK_ID = 'ambient';

export const SOUNDTRACK_IDS: readonly string[] = SOUNDTRACKS.map((track) => track.id);
