import { motion } from "motion/react";
import { Button } from "./ui/button";
import type { Mode } from "@/lib/modes";
import type { SearchablePasties } from "@/lib/context";
import type { PastiesCategory } from "@/lib/hooks/use-pasties";
import type { ReactElement } from "react";

type PS = PastiesCategory | SearchablePasties;

export function RenderEmojies({
  mode,
  pasties,
  handleSelected,
  selectedItem,
}: {
  mode: Mode;
  pasties: PS[];
  handleSelected: (v: PS) => void;
  selectedItem: string;
}) {
  return (
    <>
      {mode.slug === "emojies-picker" && (
        <div className="flex w-full flex-wrap justify-evenly gap-1">
          {pasties?.map((pasti) => {
            return (
              <PastieButton
                slug={pasti.slug}
                handleSelected={() => handleSelected(pasti)}
                className={"h-8 w-8"}
                variant={selectedItem === pasti.slug ? "outline" : "ghost"}
                children={<span className="text-lg">{pasti.item}</span>}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export function PastieButton({
  slug,
  handleSelected,
  className,
  variant,
  children,
}: {
  slug: any;
  handleSelected: any;
  variant: "outline" | "ghost";
  className: string;
  children: ReactElement;
}) {
  return (
    <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 1.6 }}>
      <Button
        size={"icon"}
        key={slug}
        className={className}
        onClick={handleSelected}
        variant={variant}
      >
        {children}
      </Button>
    </motion.div>
  );
}
