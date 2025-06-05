import { useState } from "react";
// import reactLogo from "../assets/react.svg";

import "./App.css";
import { Toaster } from "sonner";
import { AppContextProvider } from "@/lib/context";
import { HashRouter, Link, Route, Routes } from "react-router";
import Layout from "./layout";
import Home from "./home";
import Menu from "./menu";
import { SettingsRoute } from "./menu/settings";

export default function SidePanel() {
  const isDark = false

  return (
    <div className="p-4">
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
