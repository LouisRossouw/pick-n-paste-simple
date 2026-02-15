import { useMemo } from "react";
import { motion } from "motion/react";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export function FavoritesArea() {
  const { favourties, setFavourties, search, selectedCategory } = useApp();

  const filteredFavs = useMemo(() => {
    let items = favourties;
    if (selectedCategory !== "all") {
      items = items.filter((f: any) => f.type === selectedCategory);
    }

    if (!search) return items;
    const lowSearch = search.toLowerCase();
    return items.filter(
      (f: any) =>
        f.item.toLowerCase().includes(lowSearch) ||
        f.label?.toLowerCase().includes(lowSearch),
    );
  }, [favourties, search, selectedCategory]);

  function handleCopy(item: string) {
    navigator.clipboard.writeText(item).then(() => {
      toast(`${item} copied to clipboard!`);
    });
  }

  function removeFavorite(slug: string) {
    setFavourties((prev) => prev.filter((f) => f.slug !== slug));
    toast("Removed from favorites");
  }

  if (favourties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center text-sm">
        <Star className="opacity-20" size={48} />
        <p>
          You haven't starred any items yet. Click the star icon on any emoji or
          color to keep it here!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-evenly gap-4 p-4">
      {filteredFavs.map((fav) => {
        const isColor = fav.type === "color-picker";
        return (
          <motion.div
            key={fav.slug}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <Button
              variant="outline"
              className={cn(
                "h-10 w-10 relative flex items-center justify-center overflow-hidden border-2",
                isColor ? "border-transparent" : "bg-background",
              )}
              style={{ backgroundColor: isColor ? fav.item : undefined }}
              onClick={() => handleCopy(fav.item)}
            >
              {!isColor && <span className="text-xl">{fav.item}</span>}
              {isColor && (
                <span className="text-[10px] font-bold text-white mix-blend-difference opacity-70">
                  {fav.label}
                </span>
              )}
            </Button>
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(fav.slug!);
              }}
              className="absolute -top-2 -right-2 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={12} />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
