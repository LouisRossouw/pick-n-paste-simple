import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import { _getStorage, _saveStorage } from "@/lib/hooks/use-storage";

function App() {
  const [count, setCount] = useState(0);

  const toggleStartApp = async () => {
    const maybeStartApp = await _getStorage("startApp");

    const newStartApp =
      maybeStartApp?.startApp === "side-panel" ? "popup" : "side-panel";
    _saveStorage("startApp", newStartApp);
    chrome.runtime.reload();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PopUp !!</h1>
      <div className="card">
        <button
          onClick={() =>
            chrome.tabs.create({ url: "https://github.com/LouisRossouw" })
          }
        >
          Github
        </button>

        <Button onClick={() => toggleStartApp()}>Set panel</Button>
        <button
          onClick={() => {
            chrome.runtime.sendMessage("ping", (response) => {
              console.log("Received from background:", response); // "pong"
            });
          }}
        >
          backgrounddd
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
