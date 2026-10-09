import type { MetadataRoute } from "next";
import { environments } from "@/config/environments";
import { Routes } from "@/routes/routes";

const lastModified = new Date("2026-10-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${environments.appUrl}${path === "/" ? "" : path}`;
  return [
    { url: url(Routes.home), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url(Routes.terms), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: url(Routes.privacy), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
