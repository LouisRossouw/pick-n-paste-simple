import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export function SearchBox({
  search,
  handleSearch,
  clearBox,
  className,
}: {
  search: string;
  handleSearch: (v: string) => void;
  clearBox: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-lg border",
        className
      )}
    >
      <Input
        value={search}
        placeholder="Search.."
        onChange={(v) => handleSearch(v.target.value)}
        className="border-b-none focus-visible:ring-none border-none focus-visible:border-none focus-visible:ring-[0px]"
      />
      {search.length > 0 && (
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
