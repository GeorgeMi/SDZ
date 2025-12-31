"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function Gallery() {
  const t = useTranslations("gallery");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, title: t("modernOffice"), category: t("clinic") },
    { id: 2, title: t("premiumEquipment"), category: t("technology") },
    { id: 3, title: t("waitingRoom"), category: t("clinic") },
    { id: 4, title: t("scanner3D"), category: t("technology") },
    { id: 5, title: t("implantResult"), category: t("treatments") },
    { id: 6, title: t("perfectSmile"), category: t("treatments") },
  ];

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrev = () => {
    if (selectedImage === null) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === selectedImage);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedImage(galleryItems[prevIndex].id);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === selectedImage);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedImage(galleryItems[nextIndex].id);
  };

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
          <p className="text-gray-500 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative group cursor-pointer overflow-hidden ${
                index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
              onClick={() => openLightbox(item.id)}
            >
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-1 sm:mb-2 bg-gray-300 flex items-center justify-center">
                    <span className="text-base sm:text-lg lg:text-xl">📷</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium">{item.title}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-mint text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white text-sm sm:text-base font-semibold mt-0.5 sm:mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-mint transition-colors z-10"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-2 sm:left-8 text-white hover:text-mint transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 sm:right-8 text-white hover:text-mint transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>
          <div
            className="max-w-5xl w-full aspect-[4/3] sm:aspect-video bg-gray-800 flex items-center justify-center mx-8 sm:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center text-gray-400">
              <span className="text-4xl sm:text-6xl">📷</span>
              <p className="mt-2 sm:mt-4 text-base sm:text-xl text-white px-4">
                {galleryItems.find((item) => item.id === selectedImage)?.title}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
