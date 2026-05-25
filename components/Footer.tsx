"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

function ThreadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.78 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.286 1.33-3.082.88-.76 2.119-1.207 3.583-1.291 1.041-.06 2.06.044 3.005.306-.045-.638-.354-1.192-.886-1.612C15.732 9.21 14.81 8.913 13.5 8.913h-.04c-.93.005-1.85.156-2.534.412l-.685.213-.36-1.97a16.43 16.43 0 0 1 3.583-.602h.038c2.034.011 3.625.69 4.732 2.014.991 1.187 1.531 2.83 1.601 4.881.155.046.31.097.46.151 1.434.534 2.484 1.413 3.039 2.546.781 1.591.832 4.183-1.231 6.249-1.789 1.79-3.961 2.605-7.025 2.625Z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/drstefanagavriloaie/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/studiodezambete/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@studiodezambete", label: "TikTok" },
  { icon: ThreadsIcon, href: "https://www.threads.com/@studiodezambete", label: "Threads" },
];

export default function Footer() {
  const t = useTranslations("common");
  const tHeader = useTranslations("header");
  const tFooter = useTranslations("footer");
  const tServices = useTranslations("services");
  const tContact = useTranslations("contactSection");
  const locale = useLocale();

  const quickLinks = [
    { name: tHeader("aboutUs"), href: "#despre" },
    { name: tHeader("team"), href: "#echipa" },
    { name: tHeader("services"), href: "#servicii" },
    { name: tHeader("equipment"), href: "#dotari" },
    { name: tHeader("gallery"), href: "#galerie" },
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
                <table className="mt-2 sm:mt-3 text-gray-600">
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <tr key={i}>
                        <td className="pr-3 py-0.5">{tContact(`scheduleDay${i}`)}</td>
                        <td className="py-0.5">
                          {i === 1 && <span className="text-transparent" aria-hidden="true">1</span>}
                          {tContact(`scheduleHours${i}`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
