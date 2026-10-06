"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import SectionCta from "@/components/SectionCta";
import { SERVICE_ICONS } from "@/components/serviceIcons";
import { SERVICES, servicePath } from "@/lib/site";

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale();

  const services = SERVICES.map(({ slug, key }) => ({
    href: servicePath(locale, slug),
    title: t(key),
    description: t(`${key}Desc`),
    Icon: SERVICE_ICONS[slug],
  }));

  return (
    <section id="servicii" className="bg-gray-50 py-12 sm:py-16 lg:py-[15vh]">
      <div className="w-[90%] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <p className="text-mint text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
            {t("subtitle")}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-dark mb-4 sm:mb-6">
            {t("title")} <span className="font-semibold">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("description")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {services.map((service, index) => {
            const IconComponent = service.Icon;
            return (
              <motion.a
                key={service.href}
                href={service.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-[calc(50%-6px)] sm:w-[calc(33.333%-10.667px)] md:w-[calc(25%-12px)] group bg-white p-3 sm:p-4 lg:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-xl"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mint/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-mint/20 transition-colors">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 font-light text-[10px] sm:text-xs leading-relaxed hidden sm:block">
                  {service.description}
                </p>
              </motion.a>
            );
          })}
        </div>

        <p className="text-center text-gray-500 font-light text-xs sm:text-sm mt-8 sm:mt-10 px-2">
          {t("treatmentNote")}
        </p>

        <SectionCta className="mt-6 sm:mt-8" />
      </div>
    </section>
  );
}
