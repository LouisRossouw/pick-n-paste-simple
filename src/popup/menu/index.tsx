import { NavBar } from "@/components/nav-bar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from "/pick_n_paste_logo_128.png";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-4">
      <nav className="w-full">
        <div className="flex w-full">
          <NavBar
            compact
            hidePicker
            menuFN={() => navigate("/")}
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

      <div className="h-full w-full rounded-lg border">
        <Outlet />
      </div>
    </div>
  );
}
