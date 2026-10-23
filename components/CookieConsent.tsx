"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { type Consent, onOpenConsentSettings, readConsent, saveConsent, subscribeConsent, trackPhoneClicks } from "@/lib/analytics";

// `undefined` on the server and during hydration: render nothing until the stored choice is known.
const getServerSnapshot = () => undefined;

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  useEffect(() => onOpenConsentSettings(() => setReopened(true)), []);
  useEffect(() => trackPhoneClicks(), []);

  // gtag.js loads on every page (see `consentBootstrapScript`), so pass on every choice, also from another tab.
  useEffect(() => {
    if (consent) window.gtag?.("consent", "update", { analytics_storage: consent });
  }, [consent]);

  const choose = (choice: Consent) => {
    saveConsent(choice);
    setReopened(false);
  };

  return (
    <>
      {(consent === null || reopened) && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="w-[90%] max-w-7xl mx-auto py-4 sm:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed flex-1">
              <span className="font-semibold text-dark">{t("title")}.</span> {t("message")}{" "}
              <Link href={`/${locale}/privacy`} className="text-mint hover:text-mint-dark underline">
                {t("learnMore")}
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="flex-1 md:flex-none border border-gray-300 hover:border-dark text-dark px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="flex-1 md:flex-none bg-mint hover:bg-mint-dark text-dark px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
