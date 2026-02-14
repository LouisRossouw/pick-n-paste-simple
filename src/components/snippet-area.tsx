import { useState, useMemo } from "react";
import { Plus, Trash2, Clipboard } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SnippetArea() {
    const { snippets, setSnippets, search } = useApp();

    const filteredSnippets = useMemo(() => {
        if (!search) return snippets;
        const lowSearch = search.toLowerCase();
        return snippets.filter((s) =>
            s.item.toLowerCase().includes(lowSearch) ||
            s.label?.toLowerCase().includes(lowSearch)
        );
    }, [snippets, search]);
    const [newSnippet, setNewSnippet] = useState("");
    const [newLabel, setNewLabel] = useState("");

    function addSnippet() {
        if (!newSnippet.trim()) return;

        const snippet = {
            item: newSnippet.trim(),
            label: newLabel.trim() || newSnippet.trim().slice(0, 10),
            type: "snippets" as any,
            slug: `snippet-${Date.now()}`,
        };

        setSnippets((prev) => [snippet, ...prev]);
        setNewSnippet("");
        setNewLabel("");
        toast("Snippet added!");
    }

    function removeSnippet(slug: string) {
        setSnippets((prev) => prev.filter((s) => s.slug !== slug));
        toast("Snippet removed");
    }

    function handleCopy(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            toast("Snippet copied to clipboard!");
        });
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b space-y-2">
                <div className="flex gap-2">
                    <Input
                        placeholder="Label (optional)"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="h-8 text-xs"
                    />
                    <Button size="sm" onClick={addSnippet} className="h-8">
                        <Plus size={16} />
                    </Button>
                </div>
                <Input
                    placeholder="Your text here..."
                    value={newSnippet}
                    onChange={(e) => setNewSnippet(e.target.value)}
                    className="h-8 text-xs"
                    onKeyDown={(e) => e.key === "Enter" && addSnippet()}
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredSnippets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2 opacity-50">
                        <Clipboard size={32} />
                        <p className="text-xs">{search ? "No matching snippets found." : "No snippets yet."}</p>
                    </div>
                ) : (
                    filteredSnippets.map((s) => (
                        <div key={s.slug} className="flex gap-2 items-center group bg-secondary/20 p-2 rounded-md border border-transparent hover:border-secondary transition-colors">
                            <div
                                className="flex-1 cursor-pointer overflow-hidden"
                                onClick={() => handleCopy(s.item)}
                            >
                                <p className="text-xs font-bold truncate">{s.label}</p>
                                <p className="text-[10px] opacity-60 truncate">{s.item}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500"
                                onClick={() => removeSnippet(s.slug!)}
                            >
                                <Trash2 size={12} />
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
