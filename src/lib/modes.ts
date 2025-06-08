export type Modes = "emojies-picker" | "color-picker";
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
] as Mode[];
