import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

import { useApp } from "@/lib/context";

import { NavBar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/search-box";
import { PastCopyBox } from "@/components/past-copy-box";
import { FooterInfoRow } from "@/components/footer-info-row";

import logo from "/pick_n_paste_logo_1280_picked_03.png";

export default function Layout() {
  const navigate = useNavigate();

  const {
    mode,
    search,
    history,
    categories,
    favourties,
    selectedCategory,
    pastCopyBoxMode,
    setSearch,
    setHistory,
    setSelectedCategory,
  } = useApp();

  return (
    <div className="h-[calc(100vh-350px)] w-full space-y-4">
      <nav className="w-full">
        <div className="flex w-full">
          <NavBar
            menuFN={() => navigate("menu")}
            logo={
              <img
                src={chrome.runtime.getURL(logo)}
                width={120}
                height={50}
                alt="Pick n Paste"
              />
            }
          />
        </div>
      </nav>

      <div className="flex w-full justify-evenly">
        {categories.map((cat, index: number) => {
          const isAllColorPicker = mode.slug === "color-picker" && index === 0;

          return (
            <Button
              size={"icon"}
              className="h-6 w-6 sm:w-10 sm:h-10"
              style={{
                backgroundColor: mode.slug === "emojies-picker" ? "" : cat.item,
              }}
              onClick={() => {
                setSearch("");
                setSelectedCategory(isAllColorPicker ? "all" : cat.slug);
              }}
              variant={selectedCategory === cat.slug ? "outline" : "ghost"}
            >
              {mode.slug === "emojies-picker" && (
                <span className="text-lg">{cat.item}</span>
              )}
              {mode.slug === "color-picker" && index === 0 && <span>All</span>}
            </Button>
          );
        })}
      </div>

      <div className="h-full w-full rounded-lg border">
        <Outlet />
      </div>

      <div className="flex items-center justify-center rounded-lg border">
        <PastCopyBox
          mode={mode}
          pasties={pastCopyBoxMode === "history" ? history : favourties}
          setHistory={setHistory}
          clearBox={() => setHistory([])}
        />
      </div>

      <div className="flex w-full">
        <SearchBox
          search={search}
          handleSearch={setSearch}
          clearBox={() => setSearch("")}
        />
      </div>
      <div className="absolute bottom-0 -ml-4 flex w-full items-end justify-between px-4">
        <FooterInfoRow />
      </div>
    </div>
  );
}
