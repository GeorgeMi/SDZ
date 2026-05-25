"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const videoSrc =
    isMobile === null
      ? null
      : isMobile
        ? "/tur_virtual_vertical.mp4"
        : "/tur_virtual.mp4";

  return (
    <section
      id="acasa"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        {videoSrc && (
          <video
            key={videoSrc}
            src={videoSrc}
            poster={
              isMobile
                ? "/tur_virtual_vertical_poster.jpg"
                : "/tur_virtual_poster.jpg"
            }
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-[90%] max-w-5xl mx-auto text-center px-2">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-mint text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 lg:mb-8"
        >
          {t("subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.15] mb-4 sm:mb-6 lg:mb-8"
        >
          {t("title1")}
          <br />
          <span className="font-semibold">{t("title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/70 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-2"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <a
            href="#contact"
            className="bg-mint hover:bg-mint-dark text-dark px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200"
          >
            {t("bookOnline")}
          </a>
          <a
            href="tel:+40754880388"
            className="border border-white/30 hover:border-white text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
          >
            <Phone className="w-4 h-4" />
            {t("callNow")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
