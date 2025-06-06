import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useApp, type SearchablePasties } from "@/lib/context";

import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import type { PastiesCategory } from "./use-pasties";

export type MainViews = "emojies-picker" | "color-picker";

export const mainItemsOrder: MainViews[] = ["emojies-picker", "color-picker"];

export function useMainComponents(selected: string | null) {
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
            <>
              {mode.slug === "emojies-picker" && (
                <div className="flex w-full flex-wrap justify-evenly gap-1">
                  {pasties?.map((pasti) => {
                    return (
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1.6 }}
                      >
                        <Button
                          size={"icon"}
                          key={pasti.slug}
                          className="h-8 w-8"
                          onClick={() => {
                            handleSelected(pasti);
                          }}
                          variant={
                            selectedItem === pasti.slug ? "outline" : "ghost"
                          }
                        >
                          <span className="text-lg">{pasti.item}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          }
        />
      ),
      "color-picker": (
        <BarContentItem
          key="color-picker"
          chrildren={
            <>
              {mode.slug === "color-picker" && (
                <div className="flex h-full w-full flex-wrap justify-evenly sm:gap-4">
                  {pasties?.map((pasti, index) => {
                    if (selectedCategory === "all" && search.length === 0) {
                      return (
                        <>
                          <div className="flex w-full flex-wrap justify-evenly sm:gap-2">
                            {pasti?.items.map((p: any, i: number) => {
                              const isAxis = i === 0 || index === 0;

                              return (
                                <motion.div
                                  whileHover={{ scale: isAxis ? 1 : 1.2 }}
                                  whileTap={{ scale: isAxis ? 1 : 1.4 }}
                                >
                                  <Button
                                    size={"icon"}
                                    key={p.slug}
                                    style={{ backgroundColor: p.item }}
                                    className={cn(
                                      "h-6 w-6 sm:w-6",
                                      i === 0 && "flex justify-start"
                                    )}
                                    onClick={() => {
                                      if (isAxis) return;
                                      handleSelected(p);
                                    }}
                                    variant={
                                      selected === p.slug ? "outline" : "ghost"
                                    }
                                  >
                                    {i === 0 && (
                                      <span className="text-xs text-gray-500">
                                        {p.label}
                                      </span>
                                    )}
                                    {index === 0 && (
                                      <span className="text-xs text-gray-500">
                                        {p.label}
                                      </span>
                                    )}
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </div>
                        </>
                      );
                    }

                    return (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.4 }}
                      >
                        <Button
                          size={"icon"}
                          key={pasti.slug}
                          style={{ backgroundColor: pasti.item }}
                          className="h-6 w-6 sm:w-6"
                          onClick={() => {
                            handleSelected(pasti);
                          }}
                          variant={
                            selected === pasti.slug ? "outline" : "ghost"
                          }
                        >
                          {index === 0 && (
                            <span className="text-xs text-gray-500">
                              {pasti.label}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
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
