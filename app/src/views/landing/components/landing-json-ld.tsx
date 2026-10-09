import type { FC } from "react";
import { environments } from "@/config/environments";
import { faqs } from "@/views/landing/components/faq-section";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${environments.appUrl}/#organization`,
      name: "Reelty",
      url: environments.appUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${environments.appUrl}/#website`,
      url: environments.appUrl,
      name: "Reelty",
      publisher: { "@id": `${environments.appUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Reelty",
      url: environments.appUrl,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      description:
        "Web app that turns property listing photos, from a listing link, an Airbnb link or uploads, into a cinematic 1920x1080 walkthrough video.",
      featureList: [
        "Import photos from a property website or Airbnb listing link",
        "Upload your own photos",
        "Choose and reorder 3 to 12 photos",
        "Optional watermark removal per photo",
        "Optional background music",
        "1920x1080, 30 fps MP4 download",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free credits on signup, then pay-as-you-go credits" },
      publisher: { "@id": `${environments.appUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export const LandingJsonLd: FC = () => (
  <script
    type="application/ld+json"
    // "<" is escaped so content can never terminate the script tag.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
  />
);
