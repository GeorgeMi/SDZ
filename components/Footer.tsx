"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/drstefanagavriloaie/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/studiodezambete/", label: "Instagram" },
];

export default function Footer() {
  const t = useTranslations("common");
  const tHeader = useTranslations("header");
  const tFooter = useTranslations("footer");
  const tServices = useTranslations("services");
  const locale = useLocale();

  const quickLinks = [
    { name: tHeader("aboutUs"), href: "#despre" },
    // { name: tHeader("team"), href: "#echipa" },
    { name: tHeader("services"), href: "#servicii" },
    { name: tHeader("equipment"), href: "#dotari" },
    // { name: tHeader("gallery"), href: "#galerie" },
    { name: tHeader("contact"), href: "#contact" },
  ];

  const services = [
    tServices("dentalProphylaxis"),
    tServices("generalDentistry"),
    tServices("pediatricDentistry"),
    tServices("odontotherapy"),
    tServices("periodontology"),
    tServices("endodontics"),
    tServices("dentalProsthetics"),
    tServices("dentalAesthetics"),
    tServices("implantology"),
    tServices("dentalSurgery"),
  ];
  return (
    <footer className="relative text-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/background.webp')` }}
        />
        <div className="absolute inset-0 bg-white/50" />
      </div>

      {/* Main Footer */}
      <div className="relative w-[90%] max-w-7xl mx-auto py-10 sm:py-12 lg:py-[10vh]">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center lg:-mt-4">
            <div className="mb-4 sm:mb-6">
              <Image
                src="/logo.png"
                alt="Studio de Zâmbete"
                width={140}
                height={140}
                className="h-20 sm:h-24 lg:h-32 w-auto"
              />
            </div>
            <p className="text-gray-600 font-light text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 text-center">
              {tFooter("description")}
            </p>
            <div className="flex gap-2 sm:gap-3 justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-mint flex items-center justify-center text-dark hover:bg-mint-dark transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 text-dark">
              {t("navigation")}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-mint text-xs sm:text-sm font-light transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - hidden on mobile, show only first 5 on tablet */}
          <div className="hidden md:block">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 text-dark">
              {t("services")}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service}>
                  <a
                    href="#servicii"
                    className="text-gray-600 hover:text-mint text-xs sm:text-sm font-light transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#servicii"
                  className="text-mint hover:text-mint-dark text-xs sm:text-sm font-medium transition-colors"
                >
                  {t("viewAll")} →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 text-dark">
              {t("contact")}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600 font-light">
              <li>
                <a
                  href="https://maps.app.goo.gl/GtHvA4HA9sG8NoV26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mint transition-colors"
                >
                  {locale === "ro" ? (
                    <>Str. Ion Creangă, bl. D5, sc. A,<br />parter, ap. 1, Moinești, jud. Bacău</>
                  ) : (
                    <>Ion Creangă St., bl. D5, sc. A,<br />ground floor, ap. 1, Moinești, Bacău County</>
                  )}
                </a>
              </li>
              <li>
                <a href="tel:+40754880388" className="hover:text-mint transition-colors">
                  0754 880 388
                </a>
                <br />
                <a href="tel:+40751522355" className="hover:text-mint transition-colors">
                  0751 522 355
                </a>
              </li>
              <li className="hidden sm:block">
                <a
                  href="mailto:studiodezambete@gmail.com"
                  className="hover:text-mint transition-colors break-all"
                >
                  studiodezambete@gmail.com
                </a>
              </li>
              <li className="pt-4 sm:pt-6">
                <span className="font-semibold uppercase tracking-wider text-dark">{t("schedule")}</span>
                <div className="mt-2 sm:mt-3 text-gray-600">
                  {locale === "ro" ? "L" : "Mon"}: 12:00 - 20:00
                  <br />
                  {locale === "ro" ? "Ma-V" : "Tue-Fri"}: 08:00 - 19:00
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-200/50">
        <div className="w-[90%] max-w-7xl mx-auto py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm font-light text-center sm:text-left">
              © {new Date().getFullYear()} {tHeader("brandName")}. {t("allRightsReserved")}.
            </p>
            <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm">
              <Link href={`/${locale}/privacy`} className="text-gray-500 hover:text-mint transition-colors font-light">
                {t("privacy")}
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-500 hover:text-mint transition-colors font-light">
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
