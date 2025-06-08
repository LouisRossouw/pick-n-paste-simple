import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";
import type { Mode } from "@/lib/modes";

import {
  mainItemsOrder,
  useDynamicComponents,
  type MainViews,
} from "@/lib/hooks/use-dynamic-components";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function DynamicPastiesArea({
  isCompactMode,
  startView,
  blockType,
  isHovered,
  selected,
  setSelected,
}: {
  isCompactMode: boolean;
  startView?: any;
  blockType: "centerBlock";
  isHovered: boolean;
  selected: string | null;
  setSelected: (v: string | null) => void;
}) {
  const { setMode, setSearch, handleUpdateCategories, setSelectedCategory } =
    useApp();
  // const [count, setCount] = useState(0);
  // const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  // const [selected, setSelected] = useState<string | null>(null);
  const [viewsOrder, setViewsOrder] = useState<MainViews[]>(mainItemsOrder);

  const viewComponents = useDynamicComponents(selected);

  function handleUpdateMode(mode: Mode) {
    setMode(mode);
    setSearch("");
    handleUpdateCategories(mode.slug);
    setSelectedCategory(
      mode.slug === "emojies-picker" ? "smileys_emotion" : "all"
    );
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    // setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const value = api.selectedScrollSnap() + 1;
      const index1Component = viewComponents[viewsOrder[value - 1]];

      const mode = index1Component?.key as "emojies-picker" | "color-picker";

      setSelected(index1Component?.key);
      handleUpdateMode({ label: "wee", slug: mode });
    });
  }, [api]);

  useEffect(() => {
    if (startView !== undefined) {
      setSelected(startView);
      setViewsOrder([
        startView,
        ...mainItemsOrder.filter((view) => view !== startView),
      ]);
    }
  }, [startView]);

  // const yearBarView = selected === "year-bar-view" && isHovered;

  return (
    <div className="relative h-full w-full px-1">
      <Carousel
        className={cn(
          "w-full h-full justify-center items-center flex",
          isCompactMode ? "px-4" : "px-8"
        )}
        setApi={setApi}
      >
        <CarouselContent>
          {viewsOrder.map((item) => viewComponents[item])}
        </CarouselContent>
        {isHovered && (
          <>
            <CarouselPrevious
              className={cn(
                "ml-10 z-20 animate-fadeViewer hover:cursor-pointer",
                isCompactMode &&
                  "hover:bg-transparent hover:text-txt-foreground"
              )}
              variant={"ghost"}
            />
            <CarouselNext
              variant={"ghost"}
              className={cn(
                "mr-10 z-20 animate-fadeViewer hover:cursor-pointer",
                isCompactMode &&
                  "hover:bg-transparent hover:text-txt-foreground"
              )}
            />
          </>
        )}
      </Carousel>
    </div>
  );
}
