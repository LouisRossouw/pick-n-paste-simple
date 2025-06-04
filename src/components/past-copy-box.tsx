import { Clipboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import type { HistoryType } from '@/lib/hooks/use-pasties';
import type { Mode } from '@/lib/modes';


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
  const [selected, setSelected] = useState('');

  function handleSelected(pasti: HistoryType) {
    setSelected(pasti.item);

    navigator.clipboard.writeText(pasti.item).then(() => {
      console.log(`Copied ${pasti.item} to clipboard`);
    });
    toast(`${pasti.item} has been copied to your clipboard!`);
    handleHistoryUpdate(pasti);
  }

  function handleSelectAll() {
    const pastiesToCopy = pasties.join('');
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

    setHistory(prev => {
      const withoutDuplicate = prev.filter(h => h.item.trim().toLowerCase() !== newItem.item.toLowerCase());
      return [newItem, ...withoutDuplicate.slice(0, 19)];
    });
  }

  return (
    <div className="flex w-full gap-4">
      {pasties.length > 0 && (
        <div className="flex items-center justify-center gap-2 border-r">
          <Button className="h-12 w-12" variant={'ghost'} size={'icon'} onClick={handleSelectAll}>
            <Clipboard size={18} />
          </Button>
        </div>
      )}

      <div className="flex w-full gap-2 overflow-hidden">
        {pasties?.map((pastie, index) => {
          return (
            <div className="h-12 w-12">
              <Button
                key={index}
                size={'icon'}
                className="h-12 w-12"
                style={{ backgroundColor: pastie.type === 'emojies-picker' ? '' : pastie.item }}
                onClick={() => {
                  handleSelected({ item: pastie.item, type: mode.slug });
                }}
                variant={selected === pastie.item ? 'outline' : 'ghost'}>
                {pastie.type === 'emojies-picker' && <span className="text-2xl">{pastie.item}</span>}
              </Button>
            </div>
          );
        })}
      </div>
      {pasties.length > 0 && (
        <div className="flex items-center justify-center gap-2 border-l">
          <Button className="h-12 w-12" variant={'ghost'} size={'icon'} onClick={clearBox}>
            <X size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}
