import type { FC } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const faqs = [
  {
    q: "How do I make a real estate listing video from photos?",
    a: "Paste a listing link or upload 3 to 12 photos, choose and order the shots, and create the video. Reelty renders a 1920x1080 MP4 in the background and it appears in My Videos, usually within a few minutes for ten photos.",
  },
  {
    q: "How much does a real estate listing video cost?",
    a: "Industry price guides commonly quote about $300 to $1,500 per listing for a videographer. Reelty has no subscription: new accounts get free credits, and a video costs more credits the more photos it uses.",
  },
  {
    q: "Can I make an Airbnb listing video?",
    a: "Yes. Paste your public Airbnb listing link or upload your own photos, and Reelty generates a promo video you can download and use on your own website or social channels.",
  },
  {
    q: "How many photos can I use?",
    a: "Each video uses 3 to 12 photos, in the order you choose.",
  },
  {
    q: "Which photos can I use?",
    a: "Only photos you own or have permission to use. You confirm this before your first render, and we store that confirmation.",
  },
  {
    q: "Can you remove watermarks?",
    a: "You can run watermark removal on your own images. Removing someone else's watermark may infringe their rights, so our terms place that responsibility on you.",
  },
  {
    q: "Is the video a faithful tour?",
    a: "No. The video is AI-generated from your photos and may differ from the real property. Check local advertising rules before publishing it.",
  },
  {
    q: "How long does it take?",
    a: "Usually a few minutes for ten photos. You can close the page; the video appears in My Videos when it is ready.",
  },
  {
    q: "What do I get at the end?",
    a: "A 1920x1080, 30 fps MP4 with title and end cards, plus every photo used in the video, downloadable singly or as a ZIP.",
  },
];

export const FaqSection: FC = () => (
  <section id="faq" className="py-16 md:py-24">
    <div className="page-container max-w-3xl">
      <h2 className="text-display-lg">Questions, answered.</h2>
      <Accordion className="mt-8 border-t border-hairline">
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q} className="border-b border-hairline">
            <AccordionTrigger className="rounded-none py-5 text-lg font-medium text-ink hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-base text-body">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
