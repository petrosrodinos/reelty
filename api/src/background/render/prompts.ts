// Prompt templates per room type (Technical Guide §3, spec §4.2). Pure.
// Rules: one camera move per clip, no people, never guess the room (AUTO uses the generic template).
import type { RoomType } from 'generated/prisma';

export const GENERIC_PROMPT =
  'Cinematic real estate walkthrough, slow smooth camera movement, natural lighting, professional interior cinematography, elegant and serene.';

/**
 * Short and positive on purpose. Image-to-video models act on every noun in the prompt (even in a negation), so
 * "no flying leaves" produced flying leaves and "plants" produced new plants. Keep the wording minimal and never
 * mention leaves, petals, dust, particles or fans (a named fan gets added and spun), and do not name specific
 * decorations either: say "every object" instead.
 */
const OUTDOOR_MOTION =
  'only the plants and trees that are in the photo sway very slightly and water ripples softly, while the sky is completely static like a still photograph and every object, decoration and piece of furniture stays completely fixed and motionless'

/** Added to every room type. Interiors stay still; only what is visible outside a window or door may move. */
export const AMBIENT_MOTION =
  'Real-time speed, never time-lapse. Everything inside the room stays perfectly still and fixed. The sky is completely static like a still photograph. Every object, decoration and piece of furniture, indoors or outdoors, stays completely fixed and motionless. Only greenery and water visible outside a window or door may move, very slightly and slowly. Keep the scene exactly as in the photo'

export const ROOM_PROMPTS: Partial<Record<RoomType, string>> = {
  EXTERIOR: `Cinematic luxury real estate reveal, smooth slow dolly push-in toward the building facade, warm architectural lighting, ${OUTDOOR_MOTION}, professional real estate cinematography`,
  LIVING_ROOM:
    'Slow graceful camera glide across a bright luxury living room, natural daylight, airy and serene, professional interior cinematography',
  DINING_ROOM:
    'Slow smooth camera glide along an elegant dining table, soft natural light, refined and inviting, professional interior cinematography',
  KITCHEN:
    'Smooth slow tracking shot along a modern kitchen island, soft highlights on surfaces, clean and elegant',
  BEDROOM: 'Gentle slow pan across a sophisticated bedroom, soft natural light, serene atmosphere',
  OFFICE:
    'Slow gentle camera glide across a bright home office, soft natural light, calm and organised, professional interior cinematography',
  POOL: `Slow smooth camera glide along the swimming pool, sunlit water gently rippling and shimmering with light reflections, ${OUTDOOR_MOTION}, serene resort atmosphere`,
  GARDEN: `Slow smooth camera glide through a lush garden, golden natural light, ${OUTDOOR_MOTION}, peaceful and inviting`,
  TERRACE_VIEW: `Slow push-out onto a private terrace, golden hour light, sense of space and openness, ${OUTDOOR_MOTION}`,
  BALCONY: `Slow gentle push-out onto a balcony overlooking the view, soft natural light, ${OUTDOOR_MOTION}, sense of openness`,
  OUTDOOR_DINING: `Slow smooth camera glide across an outdoor dining area, warm golden light, ${OUTDOOR_MOTION}, relaxed and inviting`,
  BEACH_SEA: `Slow smooth camera glide toward the sea view, gentle waves rolling and shimmering in the sunlight, ${OUTDOOR_MOTION}, calm and expansive atmosphere`,
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
