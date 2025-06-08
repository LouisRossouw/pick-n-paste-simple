import type { Category } from "@/lib/hooks/use-pasties";
import type { Mode } from "@/lib/modes";
import { Button } from "./ui/button";

export function CategorySection({
  categories,
  mode,
  setSearch,
  setSelectedCategory,
  selectedCategory,
}: {
  categories: Category[];
  mode: Mode;
  setSearch: (v: string) => void;
  setSelectedCategory: (v: any) => void;
  selectedCategory: string;
}) {
  return (
    <>
      {categories.map((cat, index: number) => {
        const isAllColorPicker = mode.slug === "color-picker" && index === 0;

        return (
          <Button
            size={"icon"}
            className="h-6 w-6 sm:w-10 sm:h-10"
            style={{
              backgroundColor: mode.slug === "emojies-picker" ? "" : cat.item,
            }}
            onClick={() => {
              setSearch("");
              setSelectedCategory(isAllColorPicker ? "all" : cat.slug);
            }}
            variant={selectedCategory === cat.slug ? "outline" : "ghost"}
          >
            {mode.slug === "emojies-picker" && (
              <span className="text-lg">{cat.item}</span>
            )}
            {mode.slug === "color-picker" && index === 0 && <span>All</span>}
          </Button>
        );
      })}
    </>
  );
}
