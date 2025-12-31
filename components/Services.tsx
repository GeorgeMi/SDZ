"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Heart,
  Baby,
  Wrench,
  Leaf,
  Target,
  Crown,
  Gem,
  Zap,
  Microscope,
  type LucideIcon,
} from "lucide-react";

export default function Services() {
  const t = useTranslations("services");

  const services: { title: string; description: string; Icon: LucideIcon }[] = [
    { title: t("dentalProphylaxis"), description: t("dentalProphylaxisDesc"), Icon: Sparkles },
    { title: t("generalDentistry"), description: t("generalDentistryDesc"), Icon: Heart },
    { title: t("pediatricDentistry"), description: t("pediatricDentistryDesc"), Icon: Baby },
    { title: t("odontotherapy"), description: t("odontotherapyDesc"), Icon: Wrench },
    { title: t("periodontology"), description: t("periodontologyDesc"), Icon: Leaf },
    { title: t("endodontics"), description: t("endodonticsDesc"), Icon: Target },
    { title: t("dentalProsthetics"), description: t("dentalProstheticsDesc"), Icon: Crown },
    { title: t("dentalAesthetics"), description: t("dentalAestheticsDesc"), Icon: Gem },
    { title: t("implantology"), description: t("implantologyDesc"), Icon: Zap },
    { title: t("dentalSurgery"), description: t("dentalSurgeryDesc"), Icon: Microscope },
  ];

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service, index) => {
            const IconComponent = service.Icon;
            return (
              <motion.a
                key={service.title}
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white p-3 sm:p-4 lg:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-xl"
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
      </div>
    </section>
  );
}
