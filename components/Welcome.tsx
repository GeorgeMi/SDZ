"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Welcome() {
  const t = useTranslations("welcome");

  return (
    <section id="despre" className="bg-mint-light py-12 sm:py-16 lg:py-[15vh]">
      <div className="w-[90%] max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="text-mint text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
              {t("subtitle")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-dark leading-tight mb-4 sm:mb-6 lg:mb-8">
              {t("title1")} <span className="font-semibold">{t("excellence")}</span>,
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>{t("title2")} <span className="font-semibold">{t("yourSmile")}</span>
            </h2>
            <div className="text-gray-600 font-light leading-relaxed text-base sm:text-lg lg:text-xl text-justify">
              <p>{t("paragraph1")}</p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5] relative overflow-hidden">
              <Image
                src="/about_us.webp"
                alt={t("imagePlaceholder")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
