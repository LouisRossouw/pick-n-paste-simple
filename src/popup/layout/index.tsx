import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";

import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/nav-bar";
import { DynamicPastiesArea } from "@/components/dynamic-pasties-area";

import logo from "/pick_n_paste_logo_128.png";

export default function Layout() {
  const navigate = useNavigate();

  const { search, setSearch } = useApp();

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
            className="flex items-end justify-center w-full relative px-2 bg-transparent"
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
            className="flex items-center justify-evenly w-full h-10 gap-4 px-2"
          >
            <div className="w-2/3 mb-2">
              <Input
                value={search}
                placeholder="Search.."
                onChange={(v) => setSearch(v.target.value)}
                className={cn(
                  "text-center border-b-none",
                  "focus-visible:ring-none border-none",
                  "focus-visible:border-none focus-visible:ring-[0px]"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
