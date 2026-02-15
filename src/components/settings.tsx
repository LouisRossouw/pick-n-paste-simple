import { type ReactElement } from "react";
import { useNavigate } from "react-router";

import { ArrowLeft, Moon, Sun } from "lucide-react";

import { useApp } from "@/lib/context";
import { useStorge } from "@/lib/hooks/use-storage";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { CreatedBy } from "./created-by";

export function Settings({ logo }: { logo: ReactElement }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex w-full p-4">
        <div className="flex w-full">
          <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
          </Button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-4">
        <div className="flex w-full sm:w-2/3">
          <AccordionMenu logo={logo} />
        </div>
      </div>
    </div>
  );
}

export function AccordionMenu({ logo }: { logo: ReactElement }) {
  const {
    theme,
    setTheme,
    startApp,
    setStartApp,
    colorFormat,
    setColorFormat,
  } = useApp();
  const { saveStorage } = useStorge();

  const toggleTheme = () => {
    const html = document.documentElement;

    html.classList.toggle("dark");
    const maybeDark = html.classList.contains("dark");

    const newTheme = maybeDark ? "dark" : "light";

    setTheme(newTheme);
    saveStorage("theme", newTheme);
  };

  const toggleStartApp = () => {
    const newStartApp = startApp === "side-panel" ? "popup" : "side-panel";
    setStartApp(newStartApp);
    saveStorage("startApp", newStartApp);
    chrome.runtime.reload();
  };

  function handleDetach() {
    chrome.windows.create({
      url: chrome.runtime.getURL("src/popup/index.html"),
      type: "popup",
      width: 520,
      height: 330,
    });
  }

  function handleRedirectToRateUs() {
    chrome.tabs.create(
      {
        url: "https://chromewebstore.google.com/detail/pick-n-paste/igiikokiabnkbcchkelhhpificbjjjjl",
      },
      function () {},
    );
  }

  // function handleOpenSidePanel() {
  //   window.close();
  //   chrome.windows.getCurrent({ populate: true }, (window) => {
  //     (chrome as any).sidePanel.open({ windowId: window.id });
  //   });
  // }

  const isDark = theme === "light" ? true : false;

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>App</AccordionTrigger>
        <AccordionContent className="grid w-full gap-4">
          <Button
            variant={"outline"}
            onClick={() => toggleTheme()}
            className="grid w-full grid-cols-2 gap-4 p-2"
          >
            <div className="text-center">
              <p className="text-primary text-sm">Theme</p>
            </div>
            <div className="flex justify-center text-center">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </div>
          </Button>
          <Button
            variant={"outline"}
            onClick={() => toggleStartApp()}
            className="grid w-full grid-cols-2 gap-4 p-2"
          >
            <div className="text-center">
              <p className="text-primary text-sm">Start as</p>
            </div>
            <div className="text-center">
              <p className="text-primary/50 text-sm">{startApp}</p>
            </div>
          </Button>

          <Button
            variant={"outline"}
            onClick={() => handleDetach()}
            className="grid w-full grid-cols-2 gap-4 p-2"
          >
            <div className="text-center">
              <p className="text-primary text-sm">Detach</p>
            </div>
            <div className="text-center">
              <p className="text-primary/50 text-sm"></p>
            </div>
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              const newFormat = colorFormat === "hex" ? "tailwind" : "hex";
              setColorFormat(newFormat);
              saveStorage("colorFormat", newFormat);
            }}
            className="grid w-full grid-cols-2 gap-4 p-2"
          >
            <div className="text-center">
              <p className="text-primary text-sm">Color Copy</p>
            </div>
            <div className="text-center">
              <p className="text-primary/50 text-sm">{colorFormat}</p>
            </div>
          </Button>
          <Button
            variant={"outline"}
            onClick={() => handleRedirectToRateUs()}
            className="grid w-full grid-cols-2 gap-4 p-2"
          >
            <div className="text-center">
              <p className="text-primary text-sm">Rate us</p>
            </div>
            <div className="text-center">
              <p className="text-primary/50 text-sm"></p>
            </div>
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Contact</AccordionTrigger>
        <AccordionContent className="grid w-full gap-4">
          <div>Feedback & Support</div>
          <div>Send an email to louis@louisrossouw.com 😀</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>About</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <CreatedBy logo={logo} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
