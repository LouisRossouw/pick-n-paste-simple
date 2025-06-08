import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useApp, type SearchablePasties } from "@/lib/context";

import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import type { PastiesCategory } from "./use-pasties";
import { RenderEmojies } from "@/components/render-emojies";
import { RenderColors } from "@/components/render-colors";

export type MainViews = "emojies-picker" | "color-picker";

export const mainItemsOrder: MainViews[] = ["emojies-picker", "color-picker"];

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
        (h) => h.item.trim().toLowerCase() !== newItem.item.toLowerCase()
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
    }),
    [mode, selected, pasties, categories]
  );

  return viewComponents;
}

function BarContentItem({ chrildren }: { chrildren: React.ReactNode }) {
  return (
    <CarouselItem className="w-[450px]  py-2">
      <Card className="bg-transparent w-full h-[200px] p-0 m-0">
        <CardContent className="h-full overflow-y-scroll">
          {chrildren}
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
