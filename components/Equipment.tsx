"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ScanFace,
  ScanLine,
  Camera,
  Zap,
  Palette,
  Settings,
  Crosshair,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export default function Equipment() {
  const t = useTranslations("equipment");

  const equipment: { title: string; description: string; Icon: LucideIcon }[] = [
    { title: t("facialScanner"), description: t("facialScannerDesc"), Icon: ScanFace },
    { title: t("intraoralScanner"), description: t("intraoralScannerDesc"), Icon: ScanLine },
    { title: t("intraoralCamera"), description: t("intraoralCameraDesc"), Icon: Camera },
    { title: t("laser"), description: t("laserDesc"), Icon: Zap },
    { title: t("shadeDetector"), description: t("shadeDetectorDesc"), Icon: Palette },
    { title: t("endomotor"), description: t("endomotorDesc"), Icon: Settings },
    { title: t("apexLocator"), description: t("apexLocatorDesc"), Icon: Crosshair },
    { title: t("autoclave"), description: t("autoclaveDesc"), Icon: ShieldCheck },
  ];

  return (
    <section id="dotari" className="bg-white py-12 sm:py-16 lg:py-[15vh]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {equipment.map((item, index) => {
            const IconComponent = item.Icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-gray-50 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white"
              >
                <div className="w-12 h-12 bg-mint/10 flex items-center justify-center mb-4 group-hover:bg-mint/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-mint" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
