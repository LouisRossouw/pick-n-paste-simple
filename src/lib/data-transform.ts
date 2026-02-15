import { type ColorCategory, colorsDataRaw } from "./colors-raw-data.js";
import { type EmojiCategory, emojiDataRaw } from "./emojies-raw-data.js";
import { type KaomojiCategory, kaomojiDataRaw } from "./kaomoji-data.js";

type DataTypes = "emojies" | "colors" | "kaomoji";

export function transformData(dataType: DataTypes, data: any[]) {
  switch (dataType) {
    case "emojies":
      return transformEmojies(data);
    case "colors":
      return transformColors(data);
    case "kaomoji":
      return transformKaomoji(data);
  }
}

function transformEmojies(data: EmojiCategory[]) {
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

function transformKaomoji(data: KaomojiCategory[]) {
  return data.map((item) => ({
    label: item.name,
    slug: item.slug,
    item: item.emoji,
    items: item.items.map((i) => ({
      ...i,
      item: i.emoji,
      label: i.name,
      slug: i.slug,
    })),
  }));
}

export const emojiData = transformData("emojies", emojiDataRaw);
export const colorsData = transformData("colors", colorsDataRaw);
export const kaomojiData = transformData("kaomoji", kaomojiDataRaw);

export const searchableEmojies = emojiData.flatMap((category) =>
  category.items.map((e) => ({
    slug: e.slug,
    item: e.item,
    label: e.label,
    category: category.label,
    keywords: `${e.name} ${category.label}`.toLowerCase(),
  })),
);

export const searchableColors = colorsData.flatMap((category) =>
  category.items.map((e) => ({
    slug: e.slug,
    item: e.item,
    label: e.label,
    category: category.label,
    keywords: `${e.name} ${e.labelExtra} ${category.label}`.toLowerCase(),
  })),
);

export const searchableKaomoji = kaomojiData.flatMap((category) =>
  category.items.map((e: any) => ({
    slug: e.slug,
    item: e.item,
    label: e.label,
    category: category.label,
    keywords: `${e.name} ${category.label} ${e.keywords}`.toLowerCase(),
  })),
);
