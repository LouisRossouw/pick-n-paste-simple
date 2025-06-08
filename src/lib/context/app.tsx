import { createContext, useState, useContext, useMemo, useEffect } from "react";
import type { PropsWithChildren } from "react";

import type { Mode, Modes } from "@/lib/modes";

import {
  type Category,
  type HistoryType,
  type PastiesCategory,
  usePasties,
} from "@/lib/hooks/use-pasties.js";
import {
  colorsData,
  emojiData,
  searchableColors,
  searchableEmojies,
} from "@/lib/data-transform.js";
import { usePreferences } from "../hooks/use-preferences";

type CBM = "history" | "favourite";
type Theme = "light" | "dark";
type StartApp = "side-panel" | "popup";

export type SearchablePasties = {
  slug: string;
  item: string;
  label: string;
  category: string;
  keywords: string;
};

type AppContextType = {
  mode: Mode;
  startApp: string;
  setStartApp: (v: StartApp) => void;
  theme: Theme;
  setTheme: (v: Theme) => void;
  setMode: (v: Mode) => void;
  search: string;
  setSearch: (v: string) => void;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  filteredPasties: PastiesCategory[] | SearchablePasties[];
  history: HistoryType[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryType[]>>;
  favourties: HistoryType[];
  setFavourties: React.Dispatch<React.SetStateAction<HistoryType[]>>;
  pastCopyBoxMode: CBM;
  setPastCopyBoxMode: (v: CBM) => void;
  handleUpdateCategories: (v: Modes) => void;
};

export const AppContext = createContext<AppContextType>({
  mode: { slug: "emojies-picker", label: "Emojies" },
  startApp: "popup",
  setStartApp: () => {},
  theme: "light",
  setTheme: () => {},
  setMode: () => {},
  search: "",
  setSearch: () => {},
  categories: [],
  selectedCategory: "",
  setSelectedCategory: () => {},
  filteredPasties: [],
  history: [],
  setHistory: () => {},
  favourties: [],
  setFavourties: () => {},
  pastCopyBoxMode: "history",
  setPastCopyBoxMode: () => {},
  handleUpdateCategories: () => {},
});

const defaultMode = {
  slug: "emojies-picker",
  label: "Emojies",
} as Mode;

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const { getStartApp, getTheme } = usePreferences();
  const pasties = usePasties();

  const [hasMounted, setHasMounted] = useState(false);

  const [search, setSearch] = useState("");
  const [startApp, setStartApp] = useState("popup");
  const [theme, setTheme] = useState<Theme>("light");
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [pastCopyBoxMode, setPastCopyBoxMode] = useState<CBM>("history");

  useEffect(() => {
    const init = async () => {
      const startApp = await getStartApp(); // Could maybe Remove this and call it directly in the settings menu
      const theme = (await getTheme()) as Theme;

      setTheme(theme);
      setStartApp(startApp);

      if (theme) {
        setHasMounted(true);
      }
    };
    init();
  }, []);

  // ** Categories & All
  const filteredPasties: PastiesCategory[] = useMemo(() => {
    if (search.length > 0) return [];
    const cat = pasties.selectedCategory;
    const isAll = cat === "all"; // Is all categories

    if (mode.slug === "color-picker") {
      return isAll ? colorsData : colorsData.filter((e) => e.slug === cat);
    } else {
      const maybePasties = isAll
        ? emojiData
        : emojiData.filter((e) => e.slug === cat);
      return isAll ? maybePasties : maybePasties[0]?.items;
    }
  }, [mode, emojiData, pasties.selectedCategory]);

  // ** Search
  const searchedPasties: SearchablePasties[] = useMemo(() => {
    if (search.length === 0) return [];

    if (mode.slug === "color-picker") {
      return searchableColors.filter((e) =>
        e.keywords.includes(search.toLowerCase())
      );
    } else {
      return searchableEmojies.filter((e) =>
        e.keywords.includes(search.toLowerCase())
      );
    }
  }, [search]);

  if (!hasMounted) {
    return <div></div>;
  }

  return (
    <AppContext.Provider
      value={{
        ...pasties,
        startApp,
        setStartApp,
        theme,
        setTheme,
        mode,
        setMode,
        search,
        setSearch,
        filteredPasties: search.length > 0 ? searchedPasties : filteredPasties,
        pastCopyBoxMode,
        setPastCopyBoxMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
