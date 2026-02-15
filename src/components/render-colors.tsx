import { toast } from "sonner";
import { motion } from "motion/react";
import { Plus, Star } from "lucide-react";

import type { PastiesCategory } from "@/lib/hooks/use-pasties";
import type { Mode } from "@/lib/modes";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

type PS = PastiesCategory;

export function RenderColors({
  search,
  mode,
  pasties,
  handleSelected,
  selected,
  selectedCategory,
}: {
  search: string;
  mode: Mode;
  pasties: PS[];
  handleSelected: (v: PS) => void;
  selected: string | null;
  selectedCategory: string;
}) {
  const {
    palettes,
    setPalettes,
    favourties,
    setFavourties,
    setSelectedCategory,
  } = useApp();

  function toggleFavorite(pasti: PS) {
    const isFav = favourties.some((f) => f.slug === pasti.slug);
    if (isFav) {
      setFavourties((prev) => prev.filter((f) => f.slug !== pasti.slug));
      toast("Removed from favorites");
    } else {
      setFavourties((prev) => [
        {
          item: pasti.item,
          type: "color-picker",
          slug: pasti.slug,
          label: pasti.label,
        },
        ...prev,
      ]);
      toast("Added to favorites!");
    }
  }

  function addColorToPalette(color: PS) {
    if (palettes.length === 0) {
      const newPalette = {
        id: `palette-${Date.now()}`,
        name: "My Palette",
        colors: [color],
      };
      setPalettes([newPalette]);
      toast(`Created "My Palette" and added ${color.label}`);
      return;
    }

    const firstPalette = palettes[0];
    const colorExists = firstPalette.colors.some(
      (c: PS) => c.slug === color.slug,
    );

    if (colorExists) {
      toast("Color already in palette");
      return;
    }

    setPalettes((prev) =>
      prev.map((p, i) =>
        i === 0 ? { ...p, colors: [...p.colors, color] } : p,
      ),
    );
    toast(`Added ${color.label} to ${firstPalette.name}`);
  }

  return (
    <>
      {mode.slug === "color-picker" && (
        <div className="flex h-full w-full flex-wrap justify-evenly sm:gap-4">
          {pasties?.map((pasti, index) => {
            if (selectedCategory === "all" && search.length === 0) {
              return (
                <div
                  key={`${pasti.slug}-${index}`}
                  className="flex w-full flex-wrap justify-evenly sm:gap-2"
                >
                  {pasti?.items.map((p: any, i: number) => {
                    const isAxis = i === 0 || index === 0;
                    const isFav = favourties.some((f) => f.slug === p.slug);

                    return (
                      <div key={p.slug} className="group relative">
                        <motion.div
                          whileHover={{ scale: isAxis ? 1 : 1.2 }}
                          whileTap={{ scale: isAxis ? 1 : 1.4 }}
                        >
                          <Button
                            size={"icon"}
                            style={{ backgroundColor: p.item }}
                            className={cn(
                              "h-8 w-6 sm:w-12 sm:h-12",
                              i === 0 && "flex justify-start",
                            )}
                            onClick={() => {
                              if (isAxis) {
                                setSelectedCategory(p.slug);
                                return;
                              }
                              handleSelected(p);
                            }}
                            variant={selected === p.slug ? "outline" : "ghost"}
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
                        {!isAxis && (
                          <div className="absolute -top-6 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 scale-75">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(p);
                              }}
                              size={"sm"}
                              className={cn(
                                "p-0.5 w-6 h-6",
                                isFav && "text-yellow-500",
                              )}
                            >
                              <Star
                                size={10}
                                fill={isFav ? "currentColor" : "none"}
                              />
                            </Button>
                            <Button
                              size={"sm"}
                              onClick={(e) => {
                                e.stopPropagation();
                                addColorToPalette(p);
                              }}
                              className="p-0.5 w-6 h-6"
                            >
                              <Plus size={10} />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (search.length === 0 && pasti.items) {
              return (
                <div
                  key={`${pasti.slug}-${index}`}
                  className="flex flex-col w-full h-full gap-1"
                >
                  {pasti?.items.map((p: any, i: number) => {
                    const isAxis = i === 0;
                    const isFav = favourties.some((f) => f.slug === p.slug);

                    return (
                      <div key={p.slug} className="group relative flex-1">
                        <motion.div
                          className="h-full"
                          whileHover={{ scale: isAxis ? 1 : 1.02 }}
                          whileTap={{ scale: isAxis ? 1 : 1.05 }}
                        >
                          <Button
                            size={"icon"}
                            style={{ backgroundColor: p.item }}
                            className={cn(
                              "h-full w-full justify-between px-4 border shadow-sm",
                              i === 0 && "opacity-60",
                            )}
                            onClick={() => {
                              if (isAxis) return;
                              handleSelected(p);
                            }}
                            variant={selected === p.slug ? "outline" : "ghost"}
                          >
                            <span className="text-xs font-mono font-medium text-white mix-blend-difference">
                              {p.label}
                            </span>
                          </Button>
                        </motion.div>
                        {!isAxis && (
                          <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 scale-75">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(p);
                              }}
                              className={cn(
                                "p-0.5 rounded-full bg-background border shadow-sm",
                                isFav && "text-yellow-500",
                              )}
                            >
                              <Star
                                size={10}
                                fill={isFav ? "currentColor" : "none"}
                              />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                addColorToPalette(p);
                              }}
                              className="bg-primary text-primary-foreground rounded-full p-0.5"
                            >
                              <Plus size={10} />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }

            const isFavResult = favourties.some((f) => f.slug === pasti.slug);
            return (
              <div
                key={`${pasti.slug}-${index}`}
                className="group relative w-full h-10"
              >
                <Button
                  size={"icon"}
                  style={{ backgroundColor: pasti.item }}
                  className="flex h-full w-full"
                  onClick={() => {
                    handleSelected(pasti);
                  }}
                  variant={selected === pasti.slug ? "outline" : "ghost"}
                >
                  <span className="text-xs text-white mix-blend-difference opacity-70">
                    {pasti.label}
                  </span>
                </Button>
                <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 scale-75">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pasti);
                    }}
                    className={cn(
                      "p-0.5 rounded-full bg-background border shadow-sm",
                      isFavResult && "text-yellow-500",
                    )}
                  >
                    <Star
                      size={10}
                      fill={isFavResult ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addColorToPalette(pasti);
                    }}
                    className="bg-primary text-primary-foreground rounded-full p-0.5"
                  >
                    <Plus size={10} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
