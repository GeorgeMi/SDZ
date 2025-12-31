"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contactSection");
  const tServices = useTranslations("services");

  const services = [
    tServices("dentalProphylaxis"),
    tServices("generalDentistry"),
    tServices("pediatricDentistry"),
    tServices("odontotherapy"),
    tServices("periodontology"),
    tServices("endodontics"),
    tServices("dentalProsthetics"),
    tServices("dentalAesthetics"),
    tServices("implantology"),
    tServices("dentalSurgery"),
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; email?: string }>({});

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(07[0-9]{8}|(\+40|0040)7[0-9]{8})$/;
    const cleanPhone = phone.replace(/[\s-]/g, "");
    return phoneRegex.test(cleanPhone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError("");

    const errors: { phone?: string; email?: string } = {};

    if (!validatePhone(formData.phone)) {
      errors.phone = t("invalidPhone");
    }

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = t("invalidEmail");
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error");
      }

      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-gray-50 py-12 sm:py-16 lg:py-[15vh]">
      <div className="w-[90%] max-w-6xl mx-auto">
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
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-500 font-light leading-relaxed mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base text-justify">
              {t("description")}
            </p>

            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              <div className="flex gap-3 sm:gap-4 lg:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-0.5 sm:mb-1 text-sm sm:text-base">{t("addressLabel")}</h4>
                  <a
                    href="https://maps.app.goo.gl/GtHvA4HA9sG8NoV26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 font-light text-sm sm:text-base hover:text-mint transition-colors"
                  >
                    {t("addressValue")}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 lg:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-0.5 sm:mb-1 text-sm sm:text-base">{t("phoneLabel")}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <a href="tel:+40754880388" className="text-mint hover:text-mint-dark transition-colors text-sm sm:text-base">
                      0754 880 388
                    </a>
                    <span className="text-gray-400 mx-2 hidden sm:inline">|</span>
                    <a href="tel:+40751522355" className="text-mint hover:text-mint-dark transition-colors text-sm sm:text-base">
                      0751 522 355
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 lg:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h4>
                  <a href="mailto:studiodezambete@gmail.com" className="text-mint hover:text-mint-dark transition-colors text-sm sm:text-base break-all">
                    studiodezambete@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 lg:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
                </div>
                <div>
                  <h4 className="font-medium text-dark mb-0.5 sm:mb-1 text-sm sm:text-base">{t("scheduleLabel")}</h4>
                  <p className="text-gray-500 font-light text-sm sm:text-base">
                    {t("scheduleValue1")}<br />{t("scheduleValue2")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 lg:p-10 shadow-xl">
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-dark mb-1.5 sm:mb-2 uppercase tracking-wider">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 focus:border-mint focus:outline-none transition-colors bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
                    placeholder={t("fullNamePlaceholder")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-dark mb-1.5 sm:mb-2 uppercase tracking-wider">
                      {t("phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border focus:outline-none transition-colors bg-gray-50 disabled:opacity-50 text-sm sm:text-base ${
                        fieldErrors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-mint"
                      }`}
                      placeholder={t("phonePlaceholder")}
                    />
                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-dark mb-1.5 sm:mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border focus:outline-none transition-colors bg-gray-50 disabled:opacity-50 text-sm sm:text-base ${
                        fieldErrors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-mint"
                      }`}
                      placeholder={t("emailPlaceholder")}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-dark mb-1.5 sm:mb-2 uppercase tracking-wider">
                    {t("desiredService")}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 focus:border-mint focus:outline-none transition-colors bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
                  >
                    <option value="">{t("selectService")}</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-dark mb-1.5 sm:mb-2 uppercase tracking-wider">
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 focus:border-mint focus:outline-none transition-colors resize-none bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>

                {error && (
                  <div className="p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">{error}</div>
                )}

                {isSuccess && (
                  <div className="p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    {t("successMessage")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-mint hover:bg-mint-dark text-dark py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("sendRequest")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
