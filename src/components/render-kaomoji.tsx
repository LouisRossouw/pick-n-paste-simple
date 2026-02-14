import type { Mode } from "@/lib/modes";
import type { SearchablePasties } from "@/lib/context";
import type { PastiesCategory } from "@/lib/hooks/use-pasties";
import { PastieButton } from "./render-emojies";

type PS = PastiesCategory | SearchablePasties;

export function RenderKaomoji({
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
            {mode.slug === "kaomoji-picker" && (
                <div className="flex w-full flex-wrap justify-evenly gap-3">
                    {pasties?.flatMap(p => (p as any).items || [p]).map((pasti: any) => {
                        return (
                            <PastieButton
                                key={pasti.slug}
                                slug={pasti.slug}
                                handleSelected={() => handleSelected(pasti)}
                                className={"h-10 w-auto px-4 min-w-[60px]"}
                                variant={selectedItem === pasti.slug ? "outline" : "ghost"}
                                children={<span className="text-sm font-medium">{pasti.item}</span>}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
