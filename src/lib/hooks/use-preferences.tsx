import { useStorge } from "./use-storage";

export function usePreferences() {
  const { getStorage } = useStorge();

  async function getStartApp() {
    const maybeStartApp = await getStorage("startApp");

    if (!maybeStartApp?.startApp) {
      return "side-panel";
    }

    return maybeStartApp.startApp;
  }

  async function getTheme() {
    const maybeTheme = await getStorage("theme");

    if (!maybeTheme?.theme) {
      // TODO: Save it
      return "light";
    }

    const html = document.documentElement;
    maybeTheme?.theme === "dark"
      ? html.classList.add("dark")
      : html.classList.add("light");

    return maybeTheme?.theme === "dark" ? "dark" : "light";
  }

  return {
    getStartApp,
    getTheme,
  };
}
