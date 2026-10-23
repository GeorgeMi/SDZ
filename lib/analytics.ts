// Google Analytics 4 (gtag.js) and the SEO agency's Google Tag Manager container, both
// loaded on every page under Google Consent Mode v2 "advanced": consent defaults to denied,
// so until the visitor accepts, Google gets only cookieless pings and no cookie is set.
// The choice is kept in localStorage, so the banner itself sets no cookie. GA4 is
// configured here, not in GTM; GTM is for the agency's other tags (e.g. Google Ads).

export const GA_MEASUREMENT_ID = "G-N13DGS234X";
export const GTM_ID = "GTM-P4ZV3RTC";

export type Consent = "granted" | "denied";

const STORAGE_KEY = "cookie-consent";

// Inline in <head>, before gtag.js and GTM load: the consent default must be the first command.
// Ad storage stays denied: the banner only asks for analytics consent.
export const consentBootstrapScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
try { if (localStorage.getItem('${STORAGE_KEY}') === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' }); } catch (e) {}
gtag('set', 'ads_data_redaction', true);
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`;

export const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
const CHANGE_EVENT = "cookie-consent-change";
const OPEN_EVENT = "cookie-consent-open";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Fallback when localStorage is blocked, so the banner still closes.
let sessionConsent: Consent | null = null;

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {}
  return sessionConsent;
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function saveConsent(consent: Consent) {
  sessionConsent = consent;
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {}
  if (consent === "denied") deleteAnalyticsCookies();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

// GA sets `_ga` / `_ga_<id>` on the widest domain it can (e.g. `.studiodezambete.ro`), so try each level.
function deleteAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

// Conversion events: sent to GA4 via gtag, and pushed as a GTM custom event (same name)
// so the agency can trigger other tags (e.g. a Google Ads conversion) on it.
export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.gtag?.("event", name, params);
  window.dataLayer?.push({ event: name, ...params });
}

// One delegated listener covers every `tel:` link on the site.
export function trackPhoneClicks() {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
    if (link) trackEvent("phone_call", { phone_number: link.getAttribute("href")!.slice(4) });
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
