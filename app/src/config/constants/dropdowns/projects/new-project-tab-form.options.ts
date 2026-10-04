export const NewProjectTabs = {
  WEBSITE: "website",
  AIRBNB: "airbnb",
  UPLOAD: "upload",
} as const;
export type NewProjectTab = (typeof NewProjectTabs)[keyof typeof NewProjectTabs];

export const NewProjectTabFormOptions: { id: NewProjectTab; label: string }[] = [
  { id: NewProjectTabs.WEBSITE, label: "Website link" },
  { id: NewProjectTabs.AIRBNB, label: "Airbnb link" },
  { id: NewProjectTabs.UPLOAD, label: "Upload photos" },
];

export function isNewProjectTab(value: string | null | undefined): value is NewProjectTab {
  return NewProjectTabFormOptions.some((option) => option.id === value);
}
