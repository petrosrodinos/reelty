// Prompt templates per room type (Technical Guide §3, spec §4.2). Pure.
// Rules: one camera move per clip, no people, never guess the room (AUTO uses the generic template).
import type { RoomType } from 'generated/prisma';

export const GENERIC_PROMPT =
  'Cinematic real estate walkthrough, slow smooth camera movement, natural lighting, professional interior cinematography, elegant and serene.';

/** Subtle ambient motion for outdoor shots; the camera move stays the only large movement. */
const NATURE_MOTION =
  'subtle natural movement only: existing foliage and tree branches swaying slightly in place, never flying or falling, soft ripples on the water, clouds, if any, drifting at a very slow natural pace with only a tiny, barely noticeable movement';

/**
 * Added to every room type. Existing plants (indoor or outdoor, including trees, palms and plants seen through a window)
 * sway very slightly in place; fans stay still, clouds drift only a tiny amount; no leaves or other objects are ever added, detached or flying.
 */
export const AMBIENT_MOTION =
  'Everything moves at real-time speed, never time-lapse. Plants that already exist in the photo, such as houseplants, trees, palms and garden plants (also those visible outside a window or door), have their leaves sway very gently and slightly in place. Every leaf stays firmly attached to its stem or branch for the entire clip, and no leaf ever detaches, drops, falls, floats or flies away. Water in a pool or the sea softly ripples. Ceiling fans stay completely still. Strictly no loose, flying, falling or floating leaves anywhere, no petals, dust or particles, and no wind blowing through the room. Do not create any new leaves. Do not add any objects that are not in the photo. If clouds are visible they drift only a tiny amount, very slowly and calmly at a natural real-time pace, never fast and never time-lapse';

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
  POOL: `Slow smooth camera glide along the swimming pool, sunlit water gently rippling and shimmering with light reflections, palm and tree foliage swaying slightly in place, never flying or falling, clouds, if any, drifting at a very slow natural pace with only a tiny, barely noticeable movement, serene resort atmosphere`,
  GARDEN: `Slow smooth camera glide through a lush garden, golden natural light, ${NATURE_MOTION}, peaceful and inviting`,
  TERRACE_VIEW: `Slow push-out onto a private terrace, golden hour light, sense of space and openness, ${NATURE_MOTION}`,
  BALCONY: `Slow gentle push-out onto a balcony overlooking the view, soft natural light, ${NATURE_MOTION}, sense of openness`,
  OUTDOOR_DINING: `Slow smooth camera glide across an outdoor dining area, warm golden light, ${NATURE_MOTION}, relaxed and inviting`,
  BEACH_SEA: `Slow smooth camera glide toward the sea view, gentle waves rolling and shimmering in the sunlight, palm and tree foliage swaying slightly in place, never flying or falling, clouds, if any, drifting at a very slow natural pace with only a tiny, barely noticeable movement, calm and expansive atmosphere`,
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
