import { getWebSiteURL } from "@/lib/api";
import { AppVersion } from "./app-version";

// TODO; Change this
export const PRODUCT = {
  productId: "",
  productName: "",
  productUUID: "",
};

const webClient = getWebSiteURL();

export function FooterInfoRow() {
  function redirectToTOS() {
    const url = `${webClient}/other/terms-of-use?intent=terms-of-use&origin=chrome-ext&product=${PRODUCT.productId}`;
    chrome.tabs.create({ url: url }, function (tab) {});
  }

  function redirectToPOP() {
    const url = `${webClient}/other/privacy-policy?intent=privacy-policy&origin=chrome-ext&product=${PRODUCT.productId}`;
    chrome.tabs.create({ url: url }, function (tab) {});
  }

  return (
    <div className="flex w-full justify-center opacity-50">
      <div className="flex w-full justify-center px-4">
        <AppVersion />
        {/* <p className="text-light text-xs">© 2025. All rights reserved.</p>

        <div className="flex gap-1">
          <p
            className="text-light text-xs hover:cursor-pointer hover:opacity-100"
            onClick={redirectToTOS}
          >
            Terms of Use
          </p>
          <p className="text-light text-xs">-</p>
          <p
            className="text-light text-xs hover:cursor-pointer hover:opacity-100"
            onClick={redirectToPOP}
          >
            Privacy Policy
          </p>
        </div> */}
      </div>
    </div>
  );
}
