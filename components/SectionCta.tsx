import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { PRIMARY_PHONE, sectionHref } from "@/lib/site";

type Props = {
  children?: ReactNode;
  showButtons?: boolean;
  showPhone?: boolean;
  className?: string;
};

export default function SectionCta({ children, showButtons = true, showPhone = true, className = "" }: Props) {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <div className={`text-center ${className}`}>
      {children && (
        <p className="text-gray-600 font-light max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 px-2">
          {children}
        </p>
      )}
      {showButtons && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href={sectionHref(locale, "contact")}
            className="bg-mint hover:bg-mint-dark text-dark px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200"
          >
            {t("bookConsultation")}
          </a>
          {showPhone && (
            <a
              href={`tel:${PRIMARY_PHONE.e164}`}
              className="border border-dark/20 hover:border-dark text-dark px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
            >
              <Phone className="w-4 h-4" />
              {t("callPhone", { phone: PRIMARY_PHONE.display })}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
