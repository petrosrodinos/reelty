import { SourceTypes, type SourceType } from "@/features/projects/interfaces/projects.interfaces";

export const ProjectSourceTypeFormOptions: { id: SourceType; label: string }[] = [
  { id: SourceTypes.WEBSITE, label: "Website" },
  { id: SourceTypes.AIRBNB, label: "Airbnb" },
  { id: SourceTypes.UPLOAD, label: "Uploaded" },
];
