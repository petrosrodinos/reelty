// Prompt templates per room type (Technical Guide §3, spec §4.2). Pure.
// Rules: one camera move per clip, no people, never guess the room (AUTO uses the generic template).
import type { RoomType } from 'generated/prisma';

export const GENERIC_PROMPT =
  'Cinematic real estate walkthrough, slow smooth camera movement, natural lighting, professional interior cinematography, elegant and serene.';

/** Subtle ambient motion for outdoor shots; the camera move stays the only large movement. */
const NATURE_MOTION =
  'subtle natural movement only: leaves and tree branches swaying gently in a light breeze, soft ripples on the water, clouds barely moving, almost static, never time-lapse';

/** Added to every room type: a visible fan turns slowly, and anything alive outside a window or door moves a little. */
export const AMBIENT_MOTION =
  'Everything moves at real-time speed, never time-lapse or fast-forward. If a ceiling fan is visible its blades rotate very slowly, only a gentle slow turn with no blur. If plants, trees, a pool or the sea are visible outside a window or door, they move subtly: leaves swaying gently, water softly rippling. Sky and clouds stay almost static, with barely perceptible movement. All of this motion stays very gentle and slow';

export const ROOM_PROMPTS: Partial<Record<RoomType, string>> = {
  EXTERIOR: `Cinematic luxury real estate reveal, smooth slow dolly push-in toward the building facade, warm architectural lighting, ${NATURE_MOTION}, professional real estate cinematography`,
  LIVING_ROOM:
    'Slow graceful camera glide across a bright luxury living room, natural daylight, airy and serene, professional interior cinematography',
  DINING_ROOM:
    'Slow smooth camera glide along an elegant dining table, soft natural light, refined and inviting, professional interior cinematography',
  KITCHEN:
    'Smooth slow tracking shot along a modern kitchen island, soft highlights on surfaces, clean and elegant',
  BEDROOM: 'Gentle slow pan across a sophisticated bedroom, soft natural light, serene atmosphere',
  OFFICE:
    'Slow gentle camera glide across a bright home office, soft natural light, calm and organised, professional interior cinematography',
  POOL: `Slow smooth camera glide along the swimming pool, sunlit water gently rippling and shimmering with light reflections, palm and tree leaves swaying softly in a light breeze, clouds barely moving, almost static, never time-lapse, serene resort atmosphere`,
  GARDEN: `Slow smooth camera glide through a lush garden, golden natural light, ${NATURE_MOTION}, peaceful and inviting`,
  TERRACE_VIEW: `Slow push-out onto a private terrace, golden hour light, sense of space and openness, ${NATURE_MOTION}`,
  BALCONY: `Slow gentle push-out onto a balcony overlooking the view, soft natural light, ${NATURE_MOTION}, sense of openness`,
  OUTDOOR_DINING: `Slow smooth camera glide across an outdoor dining area, warm golden light, ${NATURE_MOTION}, relaxed and inviting`,
  BEACH_SEA: `Slow smooth camera glide toward the sea view, gentle waves rolling and shimmering in the sunlight, palm and tree leaves swaying softly in a light breeze, clouds barely moving, almost static, never time-lapse, calm and expansive atmosphere`,
};

/** Always appended: a single camera move and no invented people. */
export const PROMPT_SUFFIX = 'One single continuous camera move. No people.';

/**
 * Picks the template for a room type. AUTO (and room types without a template: BATHROOM, OTHER)
 * use the generic prompt: we never guess a room from the order of the photos.
 */
export function selectPrompt(roomType: RoomType | null | undefined): string {
  const base = (roomType && ROOM_PROMPTS[roomType]) || GENERIC_PROMPT;
  return `${base.replace(/[.\s]+$/, '')}. ${AMBIENT_MOTION}. ${PROMPT_SUFFIX}`;
}
