import { type ColorCategory, colorsDataRaw } from "./colors-raw-data.js";
import { type EmojiCategory, emojiDataRaw } from "./emojies-raw-data.js";

type DataTypes = "emojies" | "colors";

export function transformData(dataType: DataTypes, data: any[]) {
  switch (dataType) {
    case "emojies":
      return transformEmojies(data);
    case "colors":
      return transformColors(data);
  }
}

function transformEmojies(data: EmojiCategory[], supportedVersion = 13) {
  return data.map((item) => ({
    label: item.name,
    slug: item.slug,
    item: item.emoji,
    items: item.emojis
      // .filter(i => parseFloat(i.unicode_version) <= supportedVersion)
      .map((i) => ({
        ...i,
        item: i.emoji,
        label: i.name,
        slug: i.slug,
      })),
  }));
}

function transformColors(data: ColorCategory[]) {
  return data.map((item) => ({
    label: item.name,
    slug: `${item.name}-${item.color}`,
    item: item.color,
    items: item.swatches.map((i) => ({
      ...i,
      item: i.color,
      label: i.name,
      labelExtra: item.paletteName,
      slug: `${i.name}-${i.color}`,
    })),
  }));
}

export const emojiData = transformData("emojies", emojiDataRaw);
export const colorsData = transformData("colors", colorsDataRaw);

export const searchableEmojies = emojiData.flatMap((category) =>
  category.items.map((e) => ({
    slug: e.slug,
    item: e.item,
    label: e.label,
    category: category.label,
    keywords: `${e.name} ${category.label}`.toLowerCase(),
  }))
);

export const searchableColors = colorsData.flatMap((category) =>
  category.items.map((e) => ({
    slug: e.slug,
    item: e.item,
    label: e.label,
    category: category.label,
    keywords: `${e.name} ${e.labelExtra} ${category.label}`.toLowerCase(),
  }))
);

function supportsEmoji(emoji: string): boolean {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return false;

  ctx.canvas.width = ctx.canvas.height = 16;
  ctx.clearRect(0, 0, 16, 16);
  ctx.fillText(emoji, 0, 12);
  const pixels = ctx.getImageData(0, 0, 16, 16).data;

  // If any pixel is not blank, we assume the emoji is rendered
  return Array.from(pixels).some((value) => value !== 0);
}
