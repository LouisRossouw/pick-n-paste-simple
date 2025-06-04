import { createContext, useState, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { Mode, Modes } from '@/lib/modes';

import {type Category, type HistoryType, type PastiesCategory, usePasties } from '@/lib/hooks/use-pasties.js';
import { colorsData, emojiData, searchableColors, searchableEmojies } from '@/lib/data-transform.js';

type CopyBoxModes = 'history' | 'favourite';

export type SearchablePasties = {
  slug: string;
  item: string;
  label: string;
  category: string;
  keywords: string;
};

type AppContextType = {
  mode: Mode;
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
  pastCopyBoxMode: CopyBoxModes;
  setPastCopyBoxMode: (v: CopyBoxModes) => void;
  handleUpdateCategories: (v: Modes) => void;
};

export const AppContext = createContext<AppContextType>({
  mode: { slug: 'emojies-picker', label: 'Emojies' },
  setMode: () => {},
  search: '',
  setSearch: () => {},
  categories: [],
  selectedCategory: '',
  setSelectedCategory: () => {},
  filteredPasties: [],
  history: [],
  setHistory: () => {},
  favourties: [],
  setFavourties: () => {},
  pastCopyBoxMode: 'history',
  setPastCopyBoxMode: () => {},
  handleUpdateCategories: () => {},
});

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const pasties = usePasties();

  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<Mode>({ slug: 'emojies-picker', label: 'Emojies' });
  const [pastCopyBoxMode, setPastCopyBoxMode] = useState<CopyBoxModes>('history');

  // ** Categories & All
  const filteredPasties: PastiesCategory[] = useMemo(() => {
    if (search.length > 0) return [];
    const cat = pasties.selectedCategory;
    const isAll = cat === 'all'; // Is all categories

    if (mode.slug === 'color-picker') {
      return isAll ? colorsData : colorsData.filter(e => e.slug === cat);
    } else {
      const maybePasties = isAll ? emojiData : emojiData.filter(e => e.slug === cat);
      return isAll ? maybePasties : maybePasties[0]?.items;
    }
  }, [mode, emojiData, pasties.selectedCategory]);

  // ** Search
  const searchedPasties: SearchablePasties[] = useMemo(() => {
    if (search.length === 0) return [];

    if (mode.slug === 'color-picker') {
      return searchableColors.filter(e => e.keywords.includes(search.toLowerCase()));
    } else {
      return searchableEmojies.filter(e => e.keywords.includes(search.toLowerCase()));
    }
  }, [search]);

  return (
    <AppContext.Provider
      value={{
        ...pasties,
        mode,
        setMode,
        search,
        setSearch,
        filteredPasties: search.length > 0 ? searchedPasties : filteredPasties,
        pastCopyBoxMode,
        setPastCopyBoxMode,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
