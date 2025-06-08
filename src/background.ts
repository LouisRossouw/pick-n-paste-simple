chrome.runtime.onInstalled.addListener(() => {
  console.log("Service Worker: Installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "ping") {
    console.log("-- sender", sender);
    sendResponse("pong");
  }
});

const init = async () => {
  const maybeStartApp = (await chrome.storage.local.get(["startApp"])) as any;
  const openPanel = maybeStartApp?.startApp === "side-panel" ? true : false;

  const openPanelOnActionClick = openPanel;

  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick })
    .catch((error) => console.error(error));
};

init();
