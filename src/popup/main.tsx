import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import PopUp from "./pop-up.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopUp />
  </StrictMode>
);
