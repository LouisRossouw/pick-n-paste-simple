chrome.runtime.onInstalled.addListener(() => {
  console.log("Service Worker: Installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "ping") {
    console.log("-- sender", sender);
    sendResponse("pong");
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "reload") {
    console.log("Reload command triggered");
    chrome.runtime.reload();
  }
});

const openPanelOnActionClick = true;

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick })
  .catch((error) => console.error(error));
