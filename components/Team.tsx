"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const teamData = [
  { id: 1, image: "/dr_stefan_agavrilaoie.jpg" },
  { id: 2, image: "/dr_mihai_handic.jpg" },
  { id: 3, image: "/dr_hadi_khodr.jpg" },
  { id: 4, image: "/dr_manuela_antochi.jpg" },
  { id: 5, image: "/dr_vlad_stanciu.jpg" },
  { id: 6, image: "/as_diana_ciobanu.jpg" },
];

export default function Team() {
  const t = useTranslations("team");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const team = teamData.map((member) => ({
    ...member,
    name: t(`doctor${member.id}Name`),
    role: t(`doctor${member.id}Role`),
    faculty: t(`doctor${member.id}Faculty`).split("\n").filter(Boolean),
    courses: t(`doctor${member.id}Courses`).split("\n").filter(Boolean),
    handsOn: t(`doctor${member.id}HandsOn`).split("\n").filter(Boolean),
    congresses: t(`doctor${member.id}Congresses`).split("\n").filter(Boolean),
  }));

  const selected = team.find((m) => m.id === selectedId) ?? null;

  const closeModal = () => {
    if (typeof window !== "undefined" && window.history.state?.modal === "team") {
      window.history.back();
    } else {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedId]);

  const isOpen = selectedId !== null;
  useEffect(() => {
    if (!isOpen) return;
    window.history.pushState({ modal: "team" }, "");
    const onPop = () => setSelectedId(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [isOpen]);

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
              <button
                type="button"
                onClick={() => setSelectedId(member.id)}
                aria-label={member.name}
                className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3 sm:mb-4 lg:mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 320px"
                    priority={index < 3}
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-dark mb-0.5 sm:mb-1">
                    {member.name}
                  </h3>
                  <p className="text-mint text-[10px] sm:text-xs lg:text-sm font-medium tracking-wider whitespace-pre-line">
                    {member.role}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white w-full max-w-[calc(100vw-2rem)] md:max-w-5xl max-h-[90vh] md:min-h-[30rem] overflow-hidden md:flex md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label={t("closeBio")}
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-dark transition-colors rounded-full shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="hidden md:block relative md:w-2/5 md:self-stretch flex-shrink-0 bg-gray-100">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-contain"
                  sizes="40vw"
                />
              </div>

              <div className="w-full max-h-[90vh] md:max-h-none md:flex-1 md:min-h-0 overflow-y-auto p-6 sm:p-8 md:p-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-dark mb-2">
                  {selected.name}
                </h3>
                <p className="text-mint text-xs sm:text-sm font-medium tracking-wider uppercase mb-6 whitespace-pre-line">
                  {selected.role}
                </p>

                {selected.faculty.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-1.5">
                      {t("facultyLabel")}
                    </p>
                    {selected.faculty.length > 1 ? (
                      <ul className="space-y-1.5 list-disc pl-5 marker:text-mint">
                        {selected.faculty.map((line, i) => (
                          <li
                            key={i}
                            className="text-dark text-sm sm:text-base font-light text-justify hyphens-auto [overflow-wrap:anywhere]"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-dark text-sm sm:text-base font-light text-justify hyphens-auto [overflow-wrap:anywhere]">
                        {selected.faculty[0]}
                      </p>
                    )}
                  </div>
                )}

                {[
                  { items: selected.handsOn, label: t("handsOnLabel") },
                  { items: selected.congresses, label: t("congressesLabel") },
                  { items: selected.courses, label: t("coursesLabel") },
                ].map((section) =>
                  section.items.length > 0 ? (
                    <div key={section.label} className="mb-5 last:mb-0">
                      <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
                        {section.label}
                      </p>
                      <ul className="space-y-1.5 list-disc pl-5 marker:text-mint">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-dark text-sm sm:text-base font-light text-justify hyphens-auto [overflow-wrap:anywhere]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
