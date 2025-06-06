import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";

import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/nav-bar";
import { MainBlock } from "@/components/main-block";
import { AppVersion } from "@/components/app-version";

import logo from "/Pick_n_Pay_logo_350.png";

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
                width={20}
                height={20}
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
            <MainBlock
              isCompactMode={true}
              // startView={
              //   pinView?.pinnedViews
              //     ? (pinView.pinnedViews[pinView.selectedView]?.centerBlock ??
              //       "year-bar-view")
              //     : undefined
              // }
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
            {/* <SearchBox
              search={search}
              handleSearch={setSearch}
              clearBox={() => setSearch("")}
              className="border-none"
            /> */}
            {/* <SubBlock
              isCompactMode={true}
              blockType={'bottomBlock'}
              startView={
                pinView?.pinnedViews
                  ? (pinView?.pinnedViews[pinView.selectedView]?.bottomBlock ?? 'heatmap-view')
                  : undefined
              }
              pollCount={poll.pollCount}
              percentages={percentages}
              userSettings={userSettings}
              setShowProgressBar={setShowProgressBar}
              yearFocus={yearFocus}
              setYearFocus={setYearFocus}
              calcs={calcs}
              isBirthday={isBirthday}
              selHeatMap={selHeatMap}
              userProfile={userProfile}
              handleFocusUserStats={handleFocusUserStats}
              isHovered={isBottomBlockHovered}
              dates={dates}
              setSelHeatMap={setSelHeatMap}
              blurBlock={blurBottomBlock}
              setBlurBlock={setBlurBottomBlock}
              blurAllBlocks={blurAllBlocks}
              calenderSelectedDate={calenderSelectedDate}
              savedDates={savedDates ?? []}
              savedDateToday={savedDateToday}
              selected={pinView.bottomBlock}
              setSelected={pinView.setBottomBlock}
            /> */}
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 flex w-full items-end justify-end px-4">
        <AppVersion className="opacity-30" />

      </div> */}
    </div>
  );
}
