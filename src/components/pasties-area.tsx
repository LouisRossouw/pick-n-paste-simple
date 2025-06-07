import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { PastiesCategory } from "@/lib/hooks/use-pasties";
import { useApp, type SearchablePasties } from "@/lib/context";

import { Button } from "./ui/button";

export function PastiesArea() {
  const { search, mode, selectedCategory, filteredPasties, setHistory } =
    useApp();

  const [selected, setSelected] = useState("");

  function handleSelected(pasti: PastiesCategory | SearchablePasties) {
    navigator.clipboard.writeText(pasti.item).then(() => {
      console.log(`Copied ${pasti.item} to clipboard`);
    });
    toast(`${pasti.item} has been copied to your clipboard!`);
    setSelected(pasti.slug);

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
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 1.6 }}
                        >
                          <Button
                            size={"icon"}
                            key={p.slug}
                            className="h-12 w-12"
                            onClick={() => {
                              handleSelected(p);
                            }}
                            variant={selected === p.slug ? "outline" : "ghost"}
                          >
                            <span className="text-2xl">{p.item}</span>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 1.6 }}>
                <Button
                  size={"icon"}
                  key={pasti.slug}
                  className="h-12 w-12"
                  onClick={() => {
                    handleSelected(pasti);
                  }}
                  variant={selected === pasti.slug ? "outline" : "ghost"}
                >
                  <span className="text-2xl">{pasti.item}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      )}
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
                              "h-8 w-6 sm:w-12 sm:h-12",
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
              <div className="flex flex-col items-evenly w-full h-full gap-2">
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
    </div>
  );
}
