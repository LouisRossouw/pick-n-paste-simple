export type Modes = "emojies-picker" | "color-picker" | "favorites" | "snippets" | "kaomoji-picker" | "palettes";
export type Mode = { slug: Modes; label: string };

export const modes = [
  {
    slug: "emojies-picker",
    label: "Emojis",
  },
  {
    slug: "color-picker",
    label: "Tailwind colors",
  },
  {
    slug: "favorites",
    label: "Starred",
  },
  {
    slug: "snippets",
    label: "Snippets",
  },
  {
    slug: "kaomoji-picker",
    label: "Kaomoji",
  },
  {
    slug: "palettes",
    label: "Palettes",
  },
] as Mode[];
