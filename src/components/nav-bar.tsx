import { useLocation } from 'react-router';
import { type ReactElement, useState } from 'react';
import { ChevronDown, HandMetal, Settings } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useApp } from '@/lib/context';
import { modes, type Mode } from '@/lib/modes';

export function NavBar({ menuFN, logo, hidePicker }: { menuFN: any; logo: ReactElement; hidePicker?: boolean }) {
  const location = useLocation();
  const { mode, setMode, setSearch, setSelectedCategory, handleUpdateCategories } = useApp();
  // const { isLight } = useStorage(exampleThemeStorage);

  const [open, setOpen] = useState(false);

  function handleUpdateMode(mode: Mode) {
    setMode(mode);
    setSearch('');
    setOpen(false);
    handleUpdateCategories(mode.slug);
    setSelectedCategory(mode.slug === 'emojies-picker' ? 'smileys_emotion' : 'all');
  }

  return (
    <div className="flex w-full rounded-lg border border-slate-200 bg-slate-100">
      <div className="flex w-full justify-start gap-4 p-4">{logo}</div>
      {/* {!hidePicker && (
        <div className="flex w-full items-center justify-center">
          <PopoverMenu open={open} setOpen={setOpen} mode={mode} handleUpdateMode={handleUpdateMode} />
        </div>
      )} */}

      <div className="flex w-full items-center justify-end">
        <div className="flex items-center">
          {!hidePicker && <PopoverMenu open={open} setOpen={setOpen} mode={mode} handleUpdateMode={handleUpdateMode} />}
          <Button size="sm" variant="ghost" onClick={() => menuFN()}>
            {location.pathname === '/menu' ? <HandMetal size={18} /> : <Settings size={18} />}
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
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: Mode;
  handleUpdateMode: (v: Mode) => void;
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex gap-4" variant="outline">
          <span>{mode.label}</span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid w-full gap-2">
          {modes.map(m => {
            return (
              <Button variant={'ghost'} onClick={() => handleUpdateMode(m)}>
                <span>{m.label}</span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
