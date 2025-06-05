import { Settings } from "@/components/settings";
import logo from "/self-logo.gif";

export function SettingsRoute() {
  return (
    <Settings
      logo={
        <img
          width={50}
          height={50}
          alt="-"
          className="hue-rotate-animation"
          src={chrome.runtime.getURL(logo)}
        />
      }
    />
  );
}
