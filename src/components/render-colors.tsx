import { motion } from "motion/react";
import { Button } from "./ui/button";
import type { Mode } from "@/lib/modes";
import type { SearchablePasties } from "@/lib/context";
import type { PastiesCategory } from "@/lib/hooks/use-pasties";
import { cn } from "@/lib/utils";

type PS = PastiesCategory | any;

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
  return (
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
                      );
                    })}
                  </div>
                </>
              );
            }

            return (
              <div className="flex flex-col items-evenly w-full h-full gap-1">
                {search?.length === 0 ? (
                  <>
                    {pasti?.items?.map((i: any) => {
                      return (
                        <Button
                          size={"icon"}
                          key={i.slug}
                          style={{ backgroundColor: i.item }}
                          className="flex h-full w-full"
                          onClick={() => {
                            handleSelected(i);
                          }}
                          variant={selected === i.slug ? "outline" : "ghost"}
                        >
                          <span className="text-xs text-gray-500">
                            {i.label}
                          </span>
                        </Button>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {pasties?.map((i) => {
                      return (
                        <Button
                          size={"icon"}
                          key={i.slug}
                          style={{ backgroundColor: i.item }}
                          className="flex h-full w-full"
                          onClick={() => {
                            handleSelected(i);
                          }}
                          variant={selected === i.slug ? "outline" : "ghost"}
                        >
                          <span className="text-xs text-gray-500">
                            {i.label}
                          </span>
                        </Button>
                      );
                    })}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
