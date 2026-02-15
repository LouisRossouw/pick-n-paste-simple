import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";

import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { DynamicPastiesArea } from "@/components/dynamic-pasties-area";

import logo from "/pick_n_paste_logo_128.png";

export default function Layout() {
  const navigate = useNavigate();

  const { search, setSearch } = useApp();

  // const [isSearching, setIsSearching] = useState(false);

  // hovered blocks
  const [isCenterBlockHovered, setIsCenterBlockHovered] = useState(false);
  const [, setIsBottomBlockHovered] = useState(false);

  return (
    <div className="w-[500px]">
      <nav className="w-full">
        <div className="flex w-full">
          <NavBar
            compact={true}
            menuFN={() => navigate("menu")}
            logo={
              <img
                src={chrome.runtime.getURL(logo)}
                width={40}
                height={40}
                alt="Pick n Paste"
              />
            }
          />
        </div>
      </nav>

      <div className="flex w-full">
        <div className="w-full">
          <div
            onMouseEnter={() => setIsCenterBlockHovered(true)}
            onMouseLeave={() => setIsCenterBlockHovered(false)}
            className="flex items-end justify-center w-full relative px-4 bg-transparent"
          >
            <DynamicPastiesArea
              isCompactMode={true}
              blockType="centerBlock"
              selected={"emojies-picker"}
              isHovered={isCenterBlockHovered}
              setSelected={() => console.log("todo")}
            />
          </div>
          <div
            onMouseEnter={() => setIsBottomBlockHovered(true)}
            onMouseLeave={() => setIsBottomBlockHovered(false)}
            className="flex items-center w-full h-10 px-2 mb-2 gap-2"
          >
            {/* <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsSearching(!isSearching);
                if (isSearching) setSearch("");
              }}
              className="h-6 w-6 p-0 rounded-full hover:bg-secondary/20 transition-colors"
            >
              {isSearching ? (
                <X size={16} className="opacity-60" />
              ) : (
                <Search size={16} className="opacity-60" />
              )}
            </Button> */}

            <AnimatePresence>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1 px-8 flex items-center border-transparent overflow-hidden"
              >
                <Input
                  autoFocus
                  value={search}
                  placeholder="Search.."
                  onChange={(v) => setSearch(v.target.value)}
                  className={cn(
                    "text-center border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                    "bg-transparent h-8 text-xs font-inter",
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
