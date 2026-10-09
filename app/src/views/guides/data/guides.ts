import { Routes } from "@/routes/routes";
import type { Guide } from "@/views/guides/types";

const UPDATED = "2026-10-09";

export const realEstateListingVideo: Guide = {
  path: Routes.guideListingVideo,
  metaTitle: "How to Make a Real Estate Listing Video From Photos",
  description:
    "Turn 3 to 12 listing photos into a 1920x1080 walkthrough video. A step-by-step guide to picking photos, ordering shots and exporting an MP4, no editing skills needed.",
  eyebrow: "Guide",
  h1: "How to make a real estate listing video from photos",
  answer:
    "Pick 3 to 12 of your best listing photos, put them in walkthrough order, add motion to each one and export a 1920x1080 MP4. With Reelty you paste a listing link or upload photos, choose the shots, and the finished video appears in My Videos, usually within a few minutes for ten photos.",
  updated: UPDATED,
  sections: [
    {
      heading: "What you need",
      bullets: [
        "3 to 12 photos you own or have permission to use (landscape orientation works best).",
        "Either a public listing link (a property website or an Airbnb listing) or the image files themselves.",
        "A title for the video, and optionally a subtitle, a location or price line and a closing line.",
      ],
    },
    {
      heading: "Step by step",
      steps: [
        {
          title: "Collect the photos",
          body: "Paste a property website or Airbnb link and Reelty copies the images into private storage, or upload your own files. Copying means the video keeps working even if the original listing changes.",
        },
        {
          title: "Choose and order the shots",
          body: "Remove weak photos, drag the rest into walkthrough order and add more if you need them. Reelty accepts 3 to 12 photos per video.",
        },
        {
          title: "Clean up if needed",
          body: "Run watermark removal on your own images one at a time and check the before and after preview before you keep the result.",
        },
        {
          title: "Add details and create the video",
          body: "Set a title and optional text cards, turn background music on or off and confirm you have the rights to the photos. Rendering runs in the background, so you can close the page.",
        },
        {
          title: "Play and download",
          body: "Open My Videos to play the result and download the MP4, plus every photo used in the video, singly or as a ZIP.",
        },
      ],
    },
    {
      heading: "Which photos work best",
      paragraphs: ["The video is built from your photos, so the photos set the ceiling. A practical shot order for a sale listing:"],
      bullets: [
        "Start with the exterior or the strongest view.",
        "Move through the main living space and the kitchen.",
        "Show bedrooms and bathrooms next.",
        "Finish with outdoor space, a balcony or a view.",
        "Use sharp, well-lit, level photos and skip near-duplicates.",
      ],
    },
    {
      heading: "Output specification",
      table: {
        headers: ["Property", "Value"],
        rows: [
          ["Resolution", "1920x1080 (16:9)"],
          ["Frame rate", "30 fps"],
          ["Format", "MP4 (H.264 video, AAC audio)"],
          ["Photos per video", "3 to 12"],
          ["Music", "Optional soundtrack, or a silent track"],
          ["Typical render time", "A few minutes for ten photos"],
        ],
      },
    },
    {
      heading: "Be honest about what it is",
      paragraphs: [
        "A photo-based video is AI-generated. It adds camera movement to your photos and may differ from the real property, so it is a teaser for your listing rather than a faithful tour. Check your local advertising rules before publishing it, and only use photos you have the right to use.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I make a real estate listing video from photos?",
      a: "Choose 3 to 12 listing photos, order them as a walkthrough and generate the video. In Reelty you paste a listing link or upload photos, pick the shots, and download a 1920x1080 MP4 from My Videos when it finishes.",
    },
    {
      q: "How many photos do I need?",
      a: "Reelty needs at least 3 and accepts up to 12 photos per video.",
    },
    {
      q: "Can I make a listing video from a link instead of files?",
      a: "Yes. Paste a public property website or Airbnb listing link and Reelty copies the photos for you to curate.",
    },
    {
      q: "How long does it take?",
      a: "Usually a few minutes for ten photos. Rendering happens in the background and the video appears in My Videos when it is ready.",
    },
    {
      q: "Does it replace a professional video tour?",
      a: "No. It turns still photos into a short cinematic video. It does not capture the real layout of the property the way a filmed tour does.",
    },
  ],
  related: [Routes.guideAirbnbVideo, Routes.guideVsVideographer],
};

export const airbnbListingVideo: Guide = {
  path: Routes.guideAirbnbVideo,
  metaTitle: "Airbnb Listing Video Maker From Your Photos",
  description:
    "Make a promo video for your Airbnb or short-term rental from your listing link or photos. Get a 1920x1080 MP4 in minutes, with no filming or editing.",
  eyebrow: "For short-term rental hosts",
  h1: "Make an Airbnb listing video from your photos",
  answer:
    "Paste your Airbnb listing link or upload your photos, choose up to 12 of them and Reelty generates a 1920x1080 MP4 promo video for you to download. There is no filming or editing, and the video is yours to use on your own website, social channels and messages to guests.",
  updated: UPDATED,
  sections: [
    {
      heading: "How it works for hosts",
      steps: [
        {
          title: "Paste your Airbnb link",
          body: "Reelty reads the public listing page to find its photos and copies them to private storage. You can also upload photos instead.",
        },
        {
          title: "Pick the shots that sell the stay",
          body: "Keep the strongest 3 to 12 photos and put them in the order a guest would walk through the space.",
        },
        {
          title: "Create and download",
          body: "Add a title and a closing line such as your location, create the video and download the MP4 from My Videos when it is ready.",
        },
      ],
    },
    {
      heading: "A shot order that suits rentals",
      bullets: [
        "The view or exterior that makes people click.",
        "The main living area and the kitchen.",
        "Each bedroom, with the bed clearly visible.",
        "The bathroom.",
        "Outdoor spaces such as a balcony, pool or garden.",
      ],
    },
    {
      heading: "Where to use the video",
      bullets: [
        "On your own direct-booking website.",
        "On social channels and in ads.",
        "In messages and emails to guests who are comparing options.",
      ],
      paragraphs: [
        "Reelty exports 16:9 horizontal video in this version. Vertical 9:16 output is not supported yet.",
      ],
    },
    {
      heading: "Rights and accuracy",
      paragraphs: [
        "Use only photos you own or have permission to use, such as photos of your own listing. The video is AI-generated from those photos and may differ from the real property, so make sure it does not mislead guests about what you offer.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I make a video from my Airbnb listing link?",
      a: "Yes. Paste the link to your public Airbnb listing and Reelty copies its photos so you can choose which ones to use.",
    },
    {
      q: "Do I need to film anything?",
      a: "No. The video is generated from still photos, so you do not film or edit.",
    },
    {
      q: "What do I get?",
      a: "A 1920x1080, 30 fps MP4 with title and end cards, plus every photo used in the video as single downloads or a ZIP.",
    },
    {
      q: "Can I make a vertical video for Instagram or TikTok?",
      a: "Not yet. Reelty outputs 16:9 horizontal video in this version.",
    },
    {
      q: "Is it free to try?",
      a: "New accounts get free credits on signup, with no card needed. After that you buy credits only when you need them, and credits never expire.",
    },
  ],
  related: [Routes.guideListingVideo, Routes.guideVsVideographer],
};

export const reeltyVsVideographer: Guide = {
  path: Routes.guideVsVideographer,
  metaTitle: "Reelty vs Hiring a Real Estate Videographer",
  description:
    "Compare AI photo-to-video with hiring a real estate videographer: cost, setup, output and when each one is the better choice.",
  eyebrow: "Comparison",
  h1: "Reelty vs hiring a real estate videographer",
  answer:
    "Hire a videographer when you need a filmed tour of the real property. Use Reelty when you already have listing photos and want a short cinematic video without scheduling a shoot. Industry price guides put videographer-shot listing videos at roughly $300 to $1,500, while Reelty charges credits by photo count and gives free credits on signup.",
  updated: UPDATED,
  sections: [
    {
      heading: "Side by side",
      table: {
        headers: ["", "Reelty", "Real estate videographer"],
        rows: [
          ["What it starts from", "Your existing listing photos", "A filmed visit to the property"],
          ["Typical cost", "Credits by photo count; free credits on signup", "About $300 to $1,500 per listing in industry price guides"],
          ["Scheduling", "None; start any time", "A shoot visit and editing time"],
          ["Output", "1920x1080, 30 fps MP4 from 3 to 12 photos", "Depends on the package"],
          ["Faithful to the real layout", "No; AI-generated from photos", "Yes; real footage"],
          ["Best for", "Fast promo clips for many listings", "Premium or complex properties"],
        ],
      },
    },
    {
      heading: "What videographers cost",
      paragraphs: [
        "Published price guides vary. Basic walkthroughs are commonly quoted around $200 to $500, and drone or agent-led productions can run from about $800 to $2,500 or more. Drone footage, twilight shots, large properties, travel and rush delivery all raise the price. Several of these guides come from companies that sell video products, so get a few local quotes before you budget.",
      ],
    },
    {
      heading: "When to hire a videographer",
      bullets: [
        "The layout, flow or scale of the property is part of the sale.",
        "You want drone footage, voiceover or an on-camera agent.",
        "It is a luxury or one-of-a-kind listing where production value is the point.",
      ],
    },
    {
      heading: "When Reelty is the better fit",
      bullets: [
        "You already have good listing photos.",
        "You manage many listings and need a video for each of them.",
        "You want to test video before paying for a full shoot.",
        "You need a video quickly without coordinating a visit.",
      ],
    },
    {
      heading: "You can use both",
      paragraphs: [
        "A filmed tour and a photo-based promo clip do different jobs. Many agents use a videographer for flagship listings and a photo-to-video tool for everything else.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much does a real estate listing video cost?",
      a: "Industry price guides commonly quote about $300 to $1,500 per listing for a videographer, with basic walkthroughs lower and drone or agent-led productions higher. Reelty uses credits priced by photo count, and new accounts get free credits.",
    },
    {
      q: "Is an AI video as good as a filmed tour?",
      a: "They are different. A filmed tour shows the real space. A Reelty video adds cinematic motion to your photos and may differ from the real property.",
    },
    {
      q: "Can I use Reelty and a videographer together?",
      a: "Yes. Use a videographer for flagship properties and Reelty for listings where you only have photos.",
    },
  ],
  sources: [
    { label: "How Much Does Real Estate Videography Cost? (dronevideos.com)", url: "https://dronevideos.com/real-estate-videography-pricing/" },
  ],
  related: [Routes.guideListingVideo, Routes.guideAirbnbVideo],
};

export const guides: Guide[] = [realEstateListingVideo, airbnbListingVideo, reeltyVsVideographer];
