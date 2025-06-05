import { NavBar } from "@/components/nav-bar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from "/Pick_n_Pay_logo_1280_picked.png";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-120px)] w-full space-y-4">
      <nav className="w-full">
        <div className="flex w-full">
          <NavBar
            hidePicker
            menuFN={() => navigate("/")}
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

      <div className="h-full w-full rounded-lg border">
        <Outlet />
      </div>
    </div>
  );
}
