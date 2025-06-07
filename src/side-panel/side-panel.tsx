import "./App.css";

import { HashRouter, Link, Route, Routes } from "react-router";
import Layout from "./layout";
import Home from "./home";
import Menu from "./menu";
import { SettingsRoute } from "./menu/settings";
import { Toaster } from "@/components/ui/Sonner";
import { AppContextProvider } from "@/lib/context";

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

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
