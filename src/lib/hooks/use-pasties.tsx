import { useEffect, useState } from "react";

import type { Modes } from "@/lib/modes";
import { colorsData, emojiData, kaomojiData } from "@/lib/data-transform";

import { useStorge } from "./use-storage";

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

export type HistoryType = {
  item: string;
  type: Modes;
  slug?: string;
  label?: string;
};

export type Palette = {
  id: string;
  name: string;
  colors: HistoryType[];
};

export function usePasties() {
  const { getStorage, saveStorage } = useStorge();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("smileys_emotion");

  const [history, setHistory] = useState<HistoryType[]>([]);
  const [favourties, setFavourties] = useState<HistoryType[]>([]);
  const [snippets, setSnippets] = useState<HistoryType[]>([]);
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCategories(buildCategories("emojies-picker"));
  }, []);

  useEffect(() => {
    const loadPersistence = async () => {
      const storedHistory = await getStorage("history");
      const storedFavs = await getStorage("favorites");
      const storedSnippets = await getStorage("snippets");
      const storedPalettes = await getStorage("palettes");

      if (storedHistory?.history) {
        setHistory(storedHistory.history);
      }
      if (storedFavs?.favorites) {
        setFavourties(storedFavs.favorites);
      }
      if (storedSnippets?.snippets) {
        setSnippets(storedSnippets.snippets);
      }
      if (storedPalettes?.palettes) {
        setPalettes(storedPalettes.palettes);
      }
      setIsLoaded(true);
    };
    loadPersistence();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveStorage("history", history);
    }
  }, [history, isLoaded, saveStorage]);

  useEffect(() => {
    if (isLoaded) {
      saveStorage("favorites", favourties);
    }
  }, [favourties, isLoaded, saveStorage]);

  useEffect(() => {
    if (isLoaded) {
      saveStorage("snippets", snippets);
    }
  }, [snippets, isLoaded, saveStorage]);

  useEffect(() => {
    if (isLoaded) {
      saveStorage("palettes", palettes);
    }
  }, [palettes, isLoaded, saveStorage]);

  function buildCategories(mode?: Modes) {
    let selMode: PastiesCategory[] | undefined = undefined;

    if (mode === "color-picker") {
      selMode = colorsData;
    } else if (mode === "emojies-picker") {
      selMode = emojiData;
    } else if (mode === "kaomoji-picker") {
      const cats: Category[] = [{ slug: "all", item: "All" }];
      kaomojiData.forEach((c) => {
        cats.push({ slug: c.slug, item: c.item });
      });
      return cats;
    } else if (mode === "favorites") {
      return [
        { slug: "all", item: "All" },
        { slug: "emojies-picker", item: "😀" },
        { slug: "color-picker", item: "🎨" },
        { slug: "kaomoji-picker", item: "¯\\_(ツ)_/¯" },
      ];
    }

    const categories: Category[] = [];
    selMode?.forEach((c) => {
      categories.push({ slug: c.slug, item: c.item });
    });
    return categories;
  }

  function handleUpdateCategories(mode: Modes) {
    setCategories(buildCategories(mode));
  }

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    history,
    setHistory,
    favourties,
    setFavourties,
    snippets,
    setSnippets,
    palettes,
    setPalettes,
    handleUpdateCategories,
  };
}
