import { FooterInfoRow } from "@/components/footer-info-row";
import { NavBar } from "@/components/nav-bar";
import { PastCopyBox } from "@/components/past-copy-box";
import { SearchBox } from "@/components/search-box";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/context";

import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import viteLogo from "/Pick_n_Pay_logo_1280_picked.png";

export default function Layout() {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    mode,
    categories,
    selectedCategory,
    setSelectedCategory,
    history,
    setHistory,
    favourties,
    pastCopyBoxMode,
  } = useApp();

  return (
    <div className="h-[calc(100vh-350px)] w-full space-y-4">
      <nav className="w-full">
        <div className="flex w-full">
          <NavBar
            menuFN={() => navigate("menu")}
            logo={
              <img
                src={chrome.runtime.getURL(viteLogo)}
                width={120}
                height={50}
                alt="Pick n Paste"
              />
            }
          />
        </div>
      </nav>

      <div className="flex w-full justify-evenly">
        {categories.map((cat) => {
          return (
            <Button
              size={"icon"}
              className="h-10 w-10 sm:w-10"
              style={{
                backgroundColor: mode.slug === "emojies-picker" ? "" : cat.item,
              }}
              onClick={() => setSelectedCategory(cat.slug)}
              variant={selectedCategory === cat.slug ? "outline" : "ghost"}
            >
              {mode.slug === "emojies-picker" && (
                <span className="text-lg">{cat.item}</span>
              )}
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
        {/* <p className="text-xs opacity-50">{mode.slug}</p>
        <p className="text-xs opacity-50 hover:opacity-100">www.louisrossouw.com</p>
        <p className="text-xs opacity-50 hover:opacity-100">v1.0.0 (alpha)</p> */}
        <FooterInfoRow />
      </div>
    </div>
  );
}
