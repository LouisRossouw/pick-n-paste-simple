import { useState } from "react";
import { Plus, Trash2, Palette as PaletteIcon } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function PaletteArea() {
    const { palettes, setPalettes } = useApp();
    const [newPaletteName, setNewPaletteName] = useState("");

    function addPalette() {
        if (!newPaletteName.trim()) return;
        const newPalette = {
            id: `palette-${Date.now()}`,
            name: newPaletteName.trim(),
            colors: [],
        };
        setPalettes((prev) => [...prev, newPalette]);
        setNewPaletteName("");
        toast(`Palette "${newPalette.name}" created!`);
    }

    function removePalette(id: string) {
        setPalettes((prev) => prev.filter((p) => {
            if (p.id === id) {
                toast(`Palette "${p.name}" removed`);
            }
            return p.id !== id;
        }));
    }

    function removeColorFromPalette(paletteId: string, colorSlug: string) {
        setPalettes((prev) =>
            prev.map((p) => {
                if (p.id === paletteId) {
                    toast("Color removed from palette");
                    return { ...p, colors: p.colors.filter((c: any) => c.slug !== colorSlug) };
                }
                return p;
            })
        );
    }

    function handleCopy(item: string, label: string) {
        navigator.clipboard.writeText(item).then(() => {
            toast(`${label} copied!`);
        });
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b flex gap-2">
                <Input
                    placeholder="New palette name..."
                    value={newPaletteName}
                    onChange={(e) => setNewPaletteName(e.target.value)}
                    className="h-8 text-xs font-inter"
                    onKeyDown={(e) => e.key === "Enter" && addPalette()}
                />
                <Button size="sm" onClick={addPalette} className="h-8 px-2">
                    <Plus size={16} className="mr-1" /> Create
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {palettes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2 opacity-50">
                        <PaletteIcon size={32} />
                        <p className="text-xs text-center px-4">Create your first palette to group project colors!</p>
                    </div>
                ) : (
                    palettes.map((p) => (
                        <div key={p.id} className="bg-secondary/10 rounded-lg p-3 border space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-2">
                                    <PaletteIcon size={12} /> {p.name}
                                </h3>
                                <button
                                    onClick={() => removePalette(p.id)}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {p.colors.length === 0 && (
                                    <p className="text-[10px] opacity-40 italic">No colors added yet.</p>
                                )}
                                {p.colors.map((c: any) => (
                                    <div key={c.slug} className="group relative">
                                        <button
                                            onClick={() => handleCopy(c.item, c.label)}
                                            className="h-10 w-10 rounded-md border-2 border-background shadow-sm hover:scale-110 transition-transform"
                                            style={{ backgroundColor: c.item }}
                                            title={`${c.label} (${c.item})`}
                                        >
                                            <span className="sr-only">{c.label}</span>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeColorFromPalette(p.id, c.slug);
                                            }}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={8} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
