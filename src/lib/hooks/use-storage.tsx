export function useStorge() {
  async function getStorage(key: string) {
    return await _getStorage(key);
  }
  async function saveStorage(key: string, value: any) {
    return await _saveStorage(key, value);
  }
  return {
    getStorage,
    saveStorage,
  };
}

export async function _getStorage(key: string) {
  console.log("🚀 Fetching key;", key);
  const maybeItem = await chrome.storage.local.get([key]);
  return maybeItem;
}

export async function _saveStorage(key: string, value: any) {
  console.log("🚀 Saving key;", key, value);
  const maybeItem = await chrome.storage.local.set({ [key]: value });
  return maybeItem;
}
