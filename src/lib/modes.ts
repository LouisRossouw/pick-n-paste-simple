export type Modes = "emojies-picker" | "color-picker";
export type Mode = { slug: Modes; label: string };

export const modes = [
  {
    slug: "emojies-picker",
    label: "Emojies",
  },
  {
    slug: "color-picker",
    label: "Colors",
  },
] as Mode[];
