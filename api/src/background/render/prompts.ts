// Prompt templates per room type (Technical Guide §3, spec §4.2). Pure.
// Rules: one camera move per clip, no people, never guess the room (AUTO uses the generic template).
import type { RoomType } from 'generated/prisma';

export const GENERIC_PROMPT =
  'Cinematic real estate walkthrough, slow smooth camera movement, natural lighting, professional interior cinematography, elegant and serene.';

export const ROOM_PROMPTS: Partial<Record<RoomType, string>> = {
  EXTERIOR:
    'Cinematic luxury real estate reveal, smooth slow dolly push-in toward the building facade, warm architectural lighting, professional real estate cinematography',
  LIVING_ROOM:
    'Slow graceful camera glide across a bright luxury living room, natural daylight, airy and serene, professional interior cinematography',
  KITCHEN:
    'Smooth slow tracking shot along a modern kitchen island, soft highlights on surfaces, clean and elegant',
  BEDROOM: 'Gentle slow pan across a sophisticated bedroom, soft natural light, serene atmosphere',
  TERRACE_VIEW:
    'Slow push-out onto a private terrace, golden hour light, sense of space and openness',
};

/** Always appended: a single camera move and no invented people. */
export const PROMPT_SUFFIX = 'One single continuous camera move. No people.';

/**
 * Picks the template for a room type. AUTO (and room types without a template: BATHROOM, OTHER)
 * use the generic prompt: we never guess a room from the order of the photos.
 */
export function selectPrompt(roomType: RoomType | null | undefined): string {
  const base = (roomType && ROOM_PROMPTS[roomType]) || GENERIC_PROMPT;
  return `${base.replace(/[.\s]+$/, '')}. ${PROMPT_SUFFIX}`;
}
