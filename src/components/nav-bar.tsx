import { useLocation } from "react-router";
import { type ReactElement, useMemo, useState } from "react";
import { ChevronDown, HandMetal, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApp } from "@/lib/context";
import { modes, type Mode } from "@/lib/modes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cn } from "@/lib/utils";

export function NavBar({
  compact,
  menuFN,
  logo,
  hidePicker,
}: {
  compact?: boolean;
  menuFN: any;
  logo: ReactElement;
  hidePicker?: boolean;
}) {
  const location = useLocation();
  const {
    mode,
    setMode,
    setSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    handleUpdateCategories,
    theme,
  } = useApp();
  // const { isLight } = useStorage(exampleThemeStorage);

  const [open, setOpen] = useState(false);

  function handleUpdateMode(mode: Mode) {
    setMode(mode);
    setSearch("");
    setOpen(false);
    handleUpdateCategories(mode.slug);
    setSelectedCategory(
      mode.slug === "emojies-picker" ? "smileys_emotion" : "all",
    );
  }

  const isDark = theme === "dark" ? true : false;

  if (compact) {
    const categoriesReversed = useMemo(() => {
      return mode.slug === "emojies-picker" ? categories : categories.reverse();
    }, [categories]);

    return (
      <div
        className={cn(
          "flex w-full px-4",
          isDark ? "bg-slate-950" : "bg-slate-100",
        )}
      >
        <div className="flex items-center">{logo}</div>
        <div className="flex w-full items-center justify-center px-4">
          {location.pathname !== "/menu" &&
            mode.slug !== "palettes" &&
            mode.slug !== "snippets" && (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-32" // ensure enough space
              >
                <CarouselContent>
                  {categoriesReversed.map((cat, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <div className="flex items-center">
                        <Button
                          size="icon"
                          className="h-6 w-full" // optional: fill available space
                          style={{
                            backgroundColor:
                              mode.slug === "emojies-picker" ? "" : cat.item,
                          }}
                          onClick={() => {
                            setSearch("");
                            setSelectedCategory(cat.slug);
                          }}
                          variant={
                            selectedCategory === cat.slug ? "outline" : "ghost"
                          }
                        >
                          {mode.slug === "emojies-picker" && (
                            <span className="text-lg">{cat.item}</span>
                          )}
                          {mode.slug === "kaomoji-picker" && (
                            <span className="text-[10px] font-medium break-all leading-tight">
                              {cat.item}
                            </span>
                          )}
                          {(mode.slug === "favorites" ||
                            mode.slug === "kaomoji-picker") &&
                            cat.slug === "all" && <span>All</span>}
                          {mode.slug === "favorites" && cat.slug !== "all" && (
                            <span className="text-lg">{cat.item}</span>
                          )}
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-transparent border-none" />
                <CarouselNext className="bg-transparent border-none" />
              </Carousel>
            )}
        </div>

        <div className="flex items-center">
          <Button size="sm" variant="ghost" onClick={() => menuFN()}>
            {location.pathname === "/menu" ? (
              <HandMetal size={18} />
            ) : (
              <Settings size={18} />
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full rounded-lg border",
        isDark
          ? "border-gray-700 bg-gray-900"
          : "border-slate-200 bg-slate-100",
      )}
    >
      <div className="flex w-full justify-start gap-4 p-4">{logo}</div>
      <div className="flex w-full items-center justify-end">
        <div className="flex items-center">
          {!hidePicker && (
            <PopoverMenu
              open={open}
              setOpen={setOpen}
              mode={mode}
              handleUpdateMode={handleUpdateMode}
              variant="ghost"
            />
          )}
          <Button size="sm" variant="ghost" onClick={() => menuFN()}>
            {location.pathname === "/menu" ? (
              <HandMetal size={18} />
            ) : (
              <Settings size={18} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PopoverMenu({
  open,
  setOpen,
  mode,
  handleUpdateMode,
  variant = "outline",
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: Mode;
  handleUpdateMode: (v: Mode) => void;
  variant?: "outline" | "ghost";
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex gap-4" variant={variant}>
          <span>{mode.label}</span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid w-full gap-2">
          {modes.map((m) => {
            return (
              <Button variant={"ghost"} onClick={() => handleUpdateMode(m)}>
                <span>{m.label}</span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
