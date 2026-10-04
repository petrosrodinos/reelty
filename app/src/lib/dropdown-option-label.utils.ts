/** Reads the display label for an id from a `{ id, label }[]` options array (filter or form options). */
export function getDropdownOptionLabel<T extends string>(
  options: ReadonlyArray<{ id: T | "all"; label: string }>,
  id: T | string | null | undefined,
  fallback?: string,
): string {
  if (id === null || id === undefined) return fallback ?? "";
  return options.find((option) => option.id === id)?.label ?? fallback ?? String(id);
}
