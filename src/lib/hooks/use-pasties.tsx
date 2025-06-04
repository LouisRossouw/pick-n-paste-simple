import { useEffect, useState } from "react";

// import { colorsData, emojiData } from "../utils/data-transform.js";
import type { Modes } from "@/lib/modes";
import { colorsData, emojiData } from "@/lib/data-transform";

export type Category = {
  slug: string;
  item: string;
};

export type PastiesCategory = {
  label: string;
  slug: string;
  item: string;
  items: any[];
};

export type HistoryType = { item: string; type: Modes };

export function usePasties() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [history, setHistory] = useState<HistoryType[]>([]);
  const [favourties, setFavourties] = useState<HistoryType[]>([]);

  function buildCategories(mode?: Modes) {
    let selMode: PastiesCategory[] | undefined = undefined;

    if (mode === "color-picker") {
      selMode = colorsData;
    } else {
      selMode = emojiData;
    }

    const categories: Category[] = [];
    selMode.forEach((c) => {
      categories.push({ slug: c.slug, item: c.item });
    });
    return categories;
  }

  function handleUpdateCategories(mode: Modes) {
    setCategories(buildCategories(mode));
  }

  useEffect(() => {
    setCategories(buildCategories());
  }, []);

  // TODO; Retrieve the history from the storage and set the history / fav

  // useEffect(() => {
  //   alert(JSON.stringify(history));
  // }, [history]);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    history,
    setHistory,
    favourties,
    setFavourties,
    handleUpdateCategories,
  };
}
