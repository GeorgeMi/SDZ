"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const teamData = [
  {
    id: 1,
    image: "/dr_stefan_agavrilaoie.jpg",
    facebook: "https://www.facebook.com/drstefanagavriloaie/",
  },
  {
    id: 2,
    image: "/dr_mihai_handic.jpeg",
    facebook: null,
  },
  {
    id: 3,
    image: "/dr_hadi_khodr.png",
    facebook: null,
  },
  {
    id: 4,
    image: "/dr_manuela_antochi.png",
    facebook: null,
  },
  {
    id: 5,
    image: "/dr_vlad_stanciu.jpeg",
    facebook: null,
  },
  {
    id: 6,
    image: "/as_diana_ciobanu.jpeg",
    facebook: null,
  },
];

export default function Team() {
  const t = useTranslations("team");

  const team = teamData.map((member) => ({
    ...member,
    name: t(`doctor${member.id}Name`),
    role: t(`doctor${member.id}Role`),
    specialty: t(`doctor${member.id}Specialty`),
  }));

  return (
    <section id="echipa" className="bg-white py-12 sm:py-16 lg:py-[15vh]">
      <div className="w-[90%] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3 sm:mb-4 lg:mb-6">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 bg-gray-200 flex items-center justify-center">
                        <span className="text-lg sm:text-xl lg:text-2xl">👨‍⚕️</span>
                      </div>
                      <p className="text-[10px] sm:text-xs uppercase tracking-wider">{t("photoPlaceholder")}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-mint/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-4">
                  <a
                    href={member.facebook || "#"}
                    target={member.facebook ? "_blank" : undefined}
                    rel={member.facebook ? "noopener noreferrer" : undefined}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white flex items-center justify-center text-mint hover:scale-110 transition-transform"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="mailto:studiodezambete@gmail.com"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white flex items-center justify-center text-mint hover:scale-110 transition-transform"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-dark mb-0.5 sm:mb-1">
                  {member.name}
                </h3>
                <p className="text-mint text-[10px] sm:text-xs lg:text-sm font-medium tracking-wider whitespace-pre-line">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
