export type GuideStep = { title: string; body: string };

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: GuideStep[];
  table?: { headers: string[]; rows: string[][] };
};

export type Guide = {
  /** Public path, e.g. "/airbnb-listing-video". */
  path: string;
  /** Short page title; the root layout appends "| Reelty". */
  metaTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** Answer-first summary shown directly under the H1 (and read by AI engines). */
  answer: string;
  /** ISO date of the last content review. */
  updated: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
};
