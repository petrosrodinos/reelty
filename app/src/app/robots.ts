import type { MetadataRoute } from "next";
import { environments } from "@/config/environments";

// Marketing pages are open to every crawler, including AI search bots (GPTBot, ClaudeBot, PerplexityBot, ...).
// Authenticated and account screens are never useful in search.
const privatePaths = ["/admin/", "/projects/", "/new", "/videos", "/usage", "/credits", "/verify", "/reset", "/forgot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: privatePaths },
    sitemap: `${environments.appUrl}/sitemap.xml`,
    host: environments.appUrl,
  };
}
