import { z } from "zod";
import { VideoLimits } from "@/lib/format.utils";

const urlField = z
  .string()
  .trim()
  .min(1, "Paste a link to continue.")
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Enter a link starting with http:// or https://");

export const websiteLinkSchema = z.object({
  source_url: urlField,
});
export type WebsiteLinkFormData = z.infer<typeof websiteLinkSchema>;

const AIRBNB_HOST = /(^|\.)airbnb\.[a-z.]{2,}$/i;
const AIRBNB_ROOM_PATH = /^\/rooms\/\d+/;

export const airbnbLinkSchema = z.object({
  source_url: urlField.superRefine((value, ctx) => {
    let url: URL;
    try {
      url = new URL(value);
    } catch {
      return;
    }
    if (!AIRBNB_HOST.test(url.hostname)) {
      ctx.addIssue({ code: "custom", message: "That is not an Airbnb listing link." });
      return;
    }
    if (!AIRBNB_ROOM_PATH.test(url.pathname)) {
      ctx.addIssue({
        code: "custom",
        message: "That looks like a search page. Paste a link to one listing (airbnb.com/rooms/…).",
      });
    }
  }),
});
export type AirbnbLinkFormData = z.infer<typeof airbnbLinkSchema>;

export const videoDetailsSchema = z.object({
  title: z.string().max(VideoLimits.maxTitle, `Use at most ${VideoLimits.maxTitle} characters.`),
  subtitle: z.string().max(VideoLimits.maxSubtitle, `Use at most ${VideoLimits.maxSubtitle} characters.`),
  location_line: z.string().max(VideoLimits.maxLocationLine, `Use at most ${VideoLimits.maxLocationLine} characters.`),
  closing_line: z.string().max(VideoLimits.maxClosingLine, `Use at most ${VideoLimits.maxClosingLine} characters.`),
});
export type VideoDetailsFormData = z.infer<typeof videoDetailsSchema>;
