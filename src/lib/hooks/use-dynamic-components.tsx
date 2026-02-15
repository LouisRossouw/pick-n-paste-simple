import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useApp, type SearchablePasties } from "@/lib/context";

import { CarouselItem } from "@/components/ui/carousel";
import { SnippetArea } from "@/components/snippet-area";
import { PaletteArea } from "@/components/palette-area";
import { Card, CardContent } from "@/components/ui/card";
import { RenderColors } from "@/components/render-colors";
import { RenderEmojies } from "@/components/render-emojies";
import { RenderKaomoji } from "@/components/render-kaomoji";
import { FavoritesArea } from "@/components/favorites-area";

import type { PastiesCategory } from "./use-pasties";

export type MainViews =
  | "emojies-picker"
  | "color-picker"
  | "kaomoji-picker"
  | "palettes"
  | "favorites"
  | "snippets";

export const mainItemsOrder: MainViews[] = [
  "emojies-picker",
  "color-picker",
  "kaomoji-picker",
  "snippets",
  "palettes",
  "favorites",
];

export function useDynamicComponents(selected: string | null) {
  const {
    mode,
    search,
    categories,
    filteredPasties,
    selectedCategory,
    setHistory,
  } = useApp();

  const [selectedItem, setSelectedItem] = useState("");

  function handleSelected(pasti: PastiesCategory | SearchablePasties) {
    navigator.clipboard.writeText(pasti.item).then(() => {
      console.log(`Copied ${pasti.item} to clipboard`);
    });

    toast(`${pasti.item} has been copied to your clipboard!`);

    setSelectedItem(pasti.slug);
    handleHistoryUpdate(pasti);
  }

  function handleHistoryUpdate(pasti: PastiesCategory | SearchablePasties) {
    const newItem = {
      item: pasti.item.trim(),
      type: mode.slug,
    };

    setHistory((prev) => {
      const withoutDuplicate = prev.filter(
        (h) => h.item.trim().toLowerCase() !== newItem.item.toLowerCase(),
      );
      return [newItem, ...withoutDuplicate.slice(0, 19)];
    });
  }

  const pasties = filteredPasties as any[];

  const viewComponents = useMemo(
    () => ({
      "emojies-picker": (
        <BarContentItem
          key="emojies-picker"
          chrildren={
            <RenderEmojies
              mode={mode}
              pasties={pasties}
              handleSelected={handleSelected}
              selectedItem={selectedItem}
            />
          }
        />
      ),
      "color-picker": (
        <BarContentItem
          key="color-picker"
          chrildren={
            <RenderColors
              mode={mode}
              search={search}
              pasties={pasties}
              handleSelected={handleSelected}
              selected={selected}
              selectedCategory={selectedCategory}
            />
          }
        />
      ),
      "kaomoji-picker": (
        <BarContentItem
          key="kaomoji-picker"
          chrildren={
            <RenderKaomoji
              mode={mode}
              pasties={pasties}
              handleSelected={handleSelected}
              selectedItem={selectedItem}
            />
          }
        />
      ),
      palettes: <BarContentItem key="palettes" chrildren={<PaletteArea />} />,
      favorites: (
        <BarContentItem
          key="favorites"
          noScroll
          chrildren={<FavoritesArea />}
        />
      ),
      snippets: (
        <BarContentItem key="snippets" noScroll chrildren={<SnippetArea />} />
      ),
    }),
    [mode, selected, pasties, categories],
  );

  return viewComponents;
}

function BarContentItem({
  chrildren,
  noScroll,
}: {
  chrildren: React.ReactNode;
  noScroll?: boolean;
}) {
  return (
    <CarouselItem className="w-[450px] py-2">
      <Card className="bg-transparent border-none shadow-none rounded-none w-full h-[200px] p-0 m-0 overflow-hidden">
        <CardContent className={cn("h-full", !noScroll && "overflow-y-scroll")}>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {chrildren}
          </motion.div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
