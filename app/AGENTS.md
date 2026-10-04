## UI components

This project uses **shadcn/ui** (`src/components/ui/`).

### Dropdowns — shadcn only (never plain HTML)

Every dropdown, select, or menu **must** use the shared shadcn components. **Never** render a plain HTML `<select>` / `<option>` / `<datalist>`, hand-roll a dropdown from `<div>`/`<ul>` + state, or use `native-select.tsx` (it wraps a plain `<select>`).

| Need                                   | Use                                        |
| -------------------------------------- | ------------------------------------------ |
| Pick one value (form, filter)          | `@/components/ui/select`                   |
| Searchable / type-ahead pick           | `@/components/ui/combobox`                 |
| Action menu (row actions, kebab, user) | `@/components/ui/dropdown-menu`            |

Reuse an existing shared component from `src/components/ui/` before creating a new one. If a needed component is missing, add it with the shadcn CLI (`npx shadcn@latest add <component>`) rather than writing a plain HTML alternative.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
