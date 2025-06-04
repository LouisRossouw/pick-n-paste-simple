import {
  APP_ENV,
  WEB_ENV,
  DEV_BASEURL,
  DEV_WEBSITEURL,
  PROD_BASEURL,
  PROD_WEBSITEURL,
} from "@/tmp-env.js";

let appEnv = APP_ENV;
let webEnv = WEB_ENV;

export function getBaseURL() {
  if (appEnv === "dev") return DEV_BASEURL;
  if (appEnv === "prod") return PROD_BASEURL;
  return PROD_BASEURL;
}

export function getWebSiteURL() {
  if (webEnv === "dev") return DEV_WEBSITEURL;
  if (webEnv === "prod") return PROD_WEBSITEURL;
  return PROD_WEBSITEURL;
}
