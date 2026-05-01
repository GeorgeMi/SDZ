"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const galleryData = [
  { id: 2, src: "/cabinet_2.jpg", titleKey: "cabinet2" },
  { id: 1, src: "/cabinet_1.jpg", titleKey: "cabinet1" },
  { id: 3, src: "/cabinet_3.jpg", titleKey: "cabinet3" },
  { id: 4, src: "/cabinet_4.png", titleKey: "cabinet4" },
  { id: 5, src: "/cabinet_5.png", titleKey: "cabinet5" },
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items = galleryData.map((item) => ({ ...item, title: t(item.titleKey) }));
  const selected = items.find((i) => i.id === selectedId) ?? null;

  const goToPrev = () => {
    if (selectedId === null) return;
    const idx = items.findIndex((i) => i.id === selectedId);
    setSelectedId(items[(idx - 1 + items.length) % items.length].id);
  };

  const goToNext = () => {
    if (selectedId === null) return;
    const idx = items.findIndex((i) => i.id === selectedId);
    setSelectedId(items[(idx + 1) % items.length].id);
  };

  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <section id="galerie" className="bg-cream py-12 sm:py-16 lg:py-[15vh]">
      <div className="w-[90%] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-mint text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
            {t("subtitle")}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-dark mb-4 sm:mb-6">
            {t("title")} <span className="font-semibold">{t("titleHighlight")}</span>
          </h2>
          {t("description") && (
            <p className="text-gray-500 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">
              {t("description")}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {items.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              variants={itemVariants}
              onClick={() => setSelectedId(item.id)}
              aria-label={item.title}
              className={`relative group overflow-hidden bg-gray-100 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                idx === 0
                  ? "col-span-2 row-span-2 aspect-square"
                  : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={idx === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-mint transition-colors z-10"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              aria-label="Previous"
              className="absolute left-2 sm:left-8 text-white hover:text-mint transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="Next"
              className="absolute right-2 sm:right-8 text-white hover:text-mint transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
            </button>
            <div
              className="relative max-w-6xl w-full max-h-[85vh] mx-8 sm:mx-16 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={selected.id}
                src={selected.src}
                alt={selected.title}
                width={1920}
                height={1080}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
