let appEnv = import.meta.env.VITE_APP_ENV;
let webEnv = import.meta.env.VITE_WEB_ENV;

export function getBaseURL() {
  if (appEnv === "dev") return import.meta.env.VITE_DEV_BASEURL;
  if (appEnv === "prod") return import.meta.env.VITE_PROD_BASEURL;
  return import.meta.env.VITE_PROD_BASEURL;
}

export function getWebSiteURL() {
  if (webEnv === "dev") return import.meta.env.VITE_DEV_WEBSITEURL;
  if (webEnv === "prod") return import.meta.env.VITE_PROD_WEBSITEURL;
  return import.meta.env.VITE_PROD_WEBSITEURL;
}
