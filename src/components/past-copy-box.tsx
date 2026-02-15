import { useState } from "react";
import { Clipboard, X } from "lucide-react";
import { toast } from "sonner";

import type { Mode } from "@/lib/modes";
import type { HistoryType } from "@/lib/hooks/use-pasties";

import { Button } from "@/components/ui/button";

export function PastCopyBox({
  mode,
  pasties,
  setHistory,
  clearBox,
}: {
  mode: Mode;
  pasties: HistoryType[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryType[]>>;
  clearBox: () => void;
}) {
  const [selected, setSelected] = useState("");

  function handleSelected(pasti: HistoryType) {
    setSelected(pasti.item);

    navigator.clipboard.writeText(pasti.item).then(() => {
      console.log(`Copied ${pasti.item} to clipboard`);
    });
    toast(`${pasti.item} has been copied to your clipboard!`);
    handleHistoryUpdate(pasti);
  }

  function handleSelectAll() {
    const pastiesToCopy = pasties.join("");
    navigator.clipboard.writeText(pastiesToCopy).then(() => {
      console.log(`Copied ${pastiesToCopy} to clipboard`);
    });
    toast(`${pastiesToCopy} has been copied to your clipboard!`);
  }

  function handleHistoryUpdate(item: HistoryType) {
    const newItem = {
      item: item.item.trim(),
      type: mode.slug,
    };

    setHistory((prev) => {
      const withoutDuplicate = prev.filter(
        (h) => h.item.trim().toLowerCase() !== newItem.item.toLowerCase(),
      );
      return [newItem, ...withoutDuplicate.slice(0, 19)];
    });
  }

  return (
    <div className="flex w-full gap-4">
      {pasties.length > 0 && (
        <div className="flex items-center justify-center gap-2 border-r">
          <Button
            className="h-12 w-12"
            variant={"ghost"}
            size={"icon"}
            onClick={handleSelectAll}
          >
            <Clipboard size={18} />
          </Button>
        </div>
      )}

      <div className="flex w-full gap-2 overflow-hidden">
        {pasties?.map((pastie, index) => {
          const isColor = pastie.type === "color-picker";
          return (
            <div key={`${pastie.item}-${index}`} className="h-12 w-12">
              <Button
                size={"icon"}
                className="h-12 w-12 overflow-hidden"
                style={{
                  backgroundColor: isColor ? pastie.item : "transparent",
                }}
                onClick={() => {
                  handleSelected(pastie);
                }}
                variant={selected === pastie.item ? "outline" : "ghost"}
              >
                {!isColor && <span className="text-2xl">{pastie.item}</span>}
                {isColor && (
                  <span className="text-[10px] mix-blend-difference opacity-50">
                    {pastie.label || ""}
                  </span>
                )}
              </Button>
            </div>
          );
        })}
      </div>
      {pasties.length > 0 && (
        <div className="flex items-center justify-center gap-2 border-l">
          <Button
            className="h-12 w-12"
            variant={"ghost"}
            size={"icon"}
            onClick={clearBox}
          >
            <X size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}
