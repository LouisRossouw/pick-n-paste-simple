import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

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
import { Button } from "./ui/button";

export function DynamicPastiesArea({
  isCompactMode,
  startView,
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
  const {
    mode,
    setMode,
    setSearch,
    handleUpdateCategories,
    setSelectedCategory,
    isAddingSnippet,
    setIsAddingSnippet,
    isAddingPalette,
    setIsAddingPalette,
  } = useApp();

  const [api, setApi] = useState<CarouselApi>();
  const [viewsOrder, setViewsOrder] = useState<MainViews[]>(mainItemsOrder);

  const viewComponents = useDynamicComponents(selected);

  function handleUpdateMode(mode: Mode) {
    setMode(mode);
    setSearch("");
    handleUpdateCategories(mode.slug);

    if (mode.slug === "emojies-picker") {
      setSelectedCategory("smileys_emotion");
    } else if (mode.slug === "color-picker") {
      setSelectedCategory("all");
    } else if (mode.slug === "kaomoji-picker") {
      setSelectedCategory("all");
    } else if (mode.slug === "favorites") {
      setSelectedCategory("all");
    }
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

      const modeSlug = index1Component?.key as Mode["slug"];

      const labels: Record<string, string> = {
        "emojies-picker": "Emojis",
        "color-picker": "Tailwind colors",
        "kaomoji-picker": "Kaomoji",
        palettes: "Palettes",
        favorites: "Starred",
        snippets: "Snippets",
      };

      setSelected(index1Component?.key);
      handleUpdateMode({ label: labels[modeSlug] || "Picker", slug: modeSlug });
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
    <div className="relative h-full w-full">
      <Carousel
        className={cn(
          "w-full h-full justify-center items-center flex",
          isCompactMode ? "px-2" : "px-8",
        )}
        setApi={setApi}
      >
        <CarouselContent>
          {viewsOrder.map((item) => viewComponents[item])}
        </CarouselContent>
        {isHovered && (
          <>
            {(mode.slug === "snippets" || mode.slug === "palettes") &&
              isCompactMode && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (mode.slug === "snippets") {
                      setIsAddingSnippet(!isAddingSnippet);
                    } else {
                      setIsAddingPalette(!isAddingPalette);
                    }
                  }}
                  className={cn(
                    "absolute -left-1 bottom-40 h-6 w-6 z-50 p-0 transition-all duration-300",
                    (
                      mode.slug === "snippets"
                        ? isAddingSnippet
                        : isAddingPalette
                    )
                      ? "rotate-45 scale-110 shadow-lg"
                      : "hover:bg-secondary hover:scale-110",
                  )}
                >
                  <Plus size={16} />
                </Button>
              )}
            <CarouselPrevious
              className={cn(
                "ml-10 z-20 animate-fadeViewer hover:cursor-pointer",
                isCompactMode &&
                  "hover:bg-transparent hover:text-txt-foreground",
              )}
              variant={"ghost"}
            />
            <CarouselNext
              variant={"ghost"}
              className={cn(
                "mr-10 z-20 animate-fadeViewer hover:cursor-pointer",
                isCompactMode &&
                  "hover:bg-transparent hover:text-txt-foreground",
              )}
            />
          </>
        )}
      </Carousel>
    </div>
  );
}
