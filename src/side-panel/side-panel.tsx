import "./App.css";

import { HashRouter, Route, Routes } from "react-router";
import Layout from "./layout";
import Home from "./home";
import Menu from "./menu";
import { SettingsRoute } from "./menu/settings";
import { Toaster } from "@/components/ui/Sonner";
import { AppContextProvider } from "@/lib/context";
import { NoMatch } from "@/components/no-match";

export default function SidePanel() {
  return (
    <div className="h-screen p-2 bg-background">
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
        <Toaster />
      </AppContextProvider>
    </div>
  );
}
