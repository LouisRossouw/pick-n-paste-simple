import { useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { PastiesCategory } from "@/lib/hooks/use-pasties";
import { useApp, type SearchablePasties } from "@/lib/context";
import { PastieButton } from "./render-emojies";
import { RenderKaomoji } from "./render-kaomoji";
import { RenderColors } from "./render-colors";
import { FavoritesArea } from "./favorites-area";
import { SnippetArea } from "./snippet-area";
import { PaletteArea } from "./palette-area";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

export function PastiesArea() {
  const {
    search,
    mode,
    selectedCategory,
    filteredPasties,
    setHistory,
    favourties,
    setFavourties,
    colorFormat,
  } = useApp();

  const [selected, setSelected] = useState("");

  function handleSelected(pasti: PastiesCategory | SearchablePasties) {
    let itemToCopy = pasti.item;
    if (mode.slug === "color-picker" && colorFormat === "tailwind") {
      itemToCopy = (pasti as any).label || pasti.item;
    }

    navigator.clipboard.writeText(itemToCopy).then(() => {
      console.log(`Copied ${itemToCopy} to clipboard`);
    });
    toast(`${itemToCopy} has been copied to your clipboard!`);
    setSelected(pasti.slug);

    handleHistoryUpdate(pasti);
  }

  function toggleFavorite(pasti: PastiesCategory | SearchablePasties) {
    const isFav = favourties.some((f) => f.slug === pasti.slug);
    if (isFav) {
      setFavourties((prev) => prev.filter((f) => f.slug !== pasti.slug));
      toast("Removed from favorites");
    } else {
      setFavourties((prev) => [
        {
          item: pasti.item,
          type: mode.slug,
          slug: pasti.slug,
          label: pasti.label,
        },
        ...prev,
      ]);
      toast("Added to favorites!");
    }
  }

  function handleHistoryUpdate(pasti: PastiesCategory | SearchablePasties) {
    const newItem: any = {
      item: pasti.item.trim(),
      type: mode.slug,
      slug: pasti.slug,
      label: pasti.label,
    };

    setHistory((prev) => {
      const withoutDuplicate = prev.filter(
        (h) => h.item.trim().toLowerCase() !== newItem.item.toLowerCase(),
      );
      return [newItem, ...withoutDuplicate.slice(0, 19)];
    });
  }

  const pasties = filteredPasties as any[];

  if (mode.slug === "favorites") {
    return (
      <div className="h-full w-full overflow-y-scroll">
        <FavoritesArea />
      </div>
    );
  }

  if (mode.slug === "snippets") {
    return (
      <div className="h-full w-full">
        <SnippetArea />
      </div>
    );
  }

  if (mode.slug === "palettes") {
    return (
      <div className="h-full w-full">
        <PaletteArea />
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-scroll p-4">
      {mode.slug === "emojies-picker" && (
        <div className="flex w-full flex-wrap justify-evenly gap-2">
          {pasties?.map((pasti) => {
            if (selectedCategory === "all" && search.length === 0) {
              return (
                <div className="border-b p-4">
                  <p className="p-y-4 w-full text-lg">{pasti.label}</p>
                  <div className="flex w-full flex-wrap justify-evenly">
                    {pasti?.items.map((p: any) => {
                      return (
                        <PastieButton
                          slug={pasti.slug}
                          className={"h-12 w-12"}
                          handleSelected={() => handleSelected(pasti)}
                          variant={selected === p.slug ? "outline" : "ghost"}
                          children={<span className="text-2xl">{p.item}</span>}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div key={pasti.slug} className="group relative">
                <PastieButton
                  slug={pasti.slug}
                  handleSelected={() => handleSelected(pasti)}
                  className={"h-12 w-12"}
                  variant={selected === pasti.slug ? "outline" : "ghost"}
                  children={<span className="text-2xl">{pasti.item}</span>}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(pasti);
                  }}
                  size={"sm"}
                  className={cn(
                    "absolute -top-1 -right-1 p-0.5 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity",
                    favourties.some((f) => f.slug === pasti.slug) &&
                      "opacity-100 text-yellow-500",
                  )}
                >
                  <Star
                    size={10}
                    fill={
                      favourties.some((f) => f.slug === pasti.slug)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </Button>
              </div>
            );
          })}
        </div>
      )}
      {mode.slug === "kaomoji-picker" && (
        <div className="flex w-full flex-wrap justify-evenly gap-2">
          {pasties?.map((pasti) => {
            if (selectedCategory === "all" && search.length === 0) {
              return (
                <div key={pasti.slug} className="border-b p-4 w-full">
                  <p className="p-y-4 w-full text-lg mb-2">{pasti.label}</p>
                  <div className="flex w-full flex-wrap justify-evenly gap-2">
                    {pasti?.items.map((p: any) => {
                      const isFav = favourties.some((f) => f.slug === p.slug);
                      return (
                        <div key={p.slug} className="group relative">
                          <RenderKaomoji
                            mode={mode}
                            pasties={[p]}
                            handleSelected={handleSelected}
                            selectedItem={selected}
                          />
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(p);
                            }}
                            className={cn(
                              "absolute -top-1 -right-1 p-0.5 rounded-full border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10",
                              isFav && "opacity-100 text-yellow-500",
                            )}
                          >
                            <Star
                              size={10}
                              fill={isFav ? "currentColor" : "none"}
                            />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isFav = favourties.some((f) => f.slug === pasti.slug);
            return (
              <div key={pasti.slug} className="group relative">
                <RenderKaomoji
                  mode={mode}
                  pasties={[pasti]}
                  handleSelected={handleSelected}
                  selectedItem={selected}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(pasti);
                  }}
                  size={"sm"}
                  className={cn(
                    "absolute -top-1 -right-1 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                    isFav && "opacity-100 text-yellow-500",
                  )}
                >
                  <Star size={10} fill={isFav ? "currentColor" : "none"} />
                </Button>
              </div>
            );
          })}
        </div>
      )}
      {mode.slug === "color-picker" && (
        <RenderColors
          mode={mode}
          pasties={pasties}
          handleSelected={handleSelected}
          selected={selected}
          search={search}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
}
