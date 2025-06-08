import "./App.css";
import { AppContextProvider } from "@/lib/context";
import { HashRouter, Route, Routes } from "react-router";
import Layout from "./layout";
import Home from "./home";
import Menu from "./menu";
import { SettingsRoute } from "./menu/settings";
import { Toaster } from "@/components/ui/Sonner";
import { NoMatch } from "@/components/no-match";

export default function PopUp() {
  return (
    <div className="">
      <AppContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="menu" element={<Menu />}>
              <Route index element={<SettingsRoute />} />
            </Route>
          </Routes>
        </HashRouter>
        <Toaster isCompact />
      </AppContextProvider>
    </div>
  );
}
