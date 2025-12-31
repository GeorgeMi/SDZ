"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Phone, Globe } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: t("aboutUs"), href: "#despre" },
    // { name: t("team"), href: "#echipa" },
    { name: t("services"), href: "#servicii" },
    { name: t("equipment"), href: "#dotari" },
    // { name: t("gallery"), href: "#galerie" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    // Check scroll position on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key and focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      // Focus trap
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath || ''}`);
  };

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
    >
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-28">
          {/* Logo + Navigation group */}
          <div className="flex items-center lg:gap-12">
            {/* Logo */}
            <a href="#acasa" className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Studio de Zâmbete"
                width={140}
                height={140}
                className="h-10 sm:h-14 lg:h-24 w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wider transition-colors hover:text-mint text-dark"
              >
                {item.name}
              </a>
            ))}
            </nav>
          </div>

          {/* CTA & Language */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => switchLanguage('ro')}
                className={`px-2 py-1 text-sm font-medium transition-colors ${
                  locale === 'ro'
                    ? 'text-mint'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                RO
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 py-1 text-sm font-medium transition-colors ${
                  locale === 'en'
                    ? 'text-mint'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="tel:+40754880388"
              className="flex items-center gap-2 text-sm font-medium transition-colors text-dark"
            >
              <Phone className="w-4 h-4" />
              0754 880 388
            </a>
            <a
              href="#contact"
              className="bg-mint hover:bg-mint-dark text-dark px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200"
            >
              {t("appointment")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors text-dark"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

    </header>

      {/* Mobile Menu - Fullscreen Overlay (outside header to avoid CSS conflicts) */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Meniu navigare"
          className="lg:hidden fixed inset-0 z-[100] flex flex-col bg-white"
        >
          {/* Header cu logo și buton închidere */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
            <Image
              src="/logo.png"
              alt="Studio de Zâmbete"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-dark p-2 -mr-2"
              aria-label="Închide meniul"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigare */}
          <nav className="flex-1 flex flex-col justify-center px-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-dark text-lg font-medium py-4 border-b border-gray-100 hover:text-mint transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Footer meniu */}
          <div className="px-6 py-8 border-t border-gray-100">
            {/* Language Switcher Mobile */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  switchLanguage('ro');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${
                  locale === 'ro'
                    ? 'bg-mint text-dark border-mint'
                    : 'text-gray-500 border-gray-200 hover:border-mint'
                }`}
              >
                Română
              </button>
              <button
                onClick={() => {
                  switchLanguage('en');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${
                  locale === 'en'
                    ? 'bg-mint text-dark border-mint'
                    : 'text-gray-500 border-gray-200 hover:border-mint'
                }`}
              >
                English
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-mint hover:bg-mint-dark text-dark w-full py-4 text-sm font-semibold uppercase tracking-wider text-center block mb-6 transition-colors"
            >
              {t("appointmentOnline")}
            </a>
            <div className="flex justify-center gap-8 text-gray-500 text-sm">
              <a href="tel:+40754880388" className="hover:text-mint transition-colors">
                0754 880 388
              </a>
              <a href="mailto:studiodezambete@gmail.com" className="hover:text-mint transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
