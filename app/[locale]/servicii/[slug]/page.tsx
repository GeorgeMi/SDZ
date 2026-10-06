import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionCta from "@/components/SectionCta";
import { SERVICE_ICONS } from "@/components/serviceIcons";
import { getServiceContent } from "@/lib/services";
import { LOCALES, SERVICES, servicePath, type Locale } from "@/lib/site";
import { localeAlternates, socialMetadata, serializeJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function resolveParams(params: Props["params"]) {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service || !LOCALES.includes(locale as Locale)) notFound();
  return { locale: locale as Locale, service };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service } = await resolveParams(params);
  const content = getServiceContent(locale, service.slug);
  const alternates = localeAlternates(locale, `/servicii/${service.slug}`);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates,
    ...socialMetadata(locale, alternates.canonical, content.metaTitle, content.metaDescription),
  };
}

// "Term – explanation" list items get the term emphasised.
function ItemText({ text }: { text: string }) {
  const [term, ...rest] = text.split(" – ");
  if (!rest.length) return <>{text}</>;
  return (
    <>
      <span className="font-medium text-dark">{term}</span> – {rest.join(" – ")}
    </>
  );
}

const eyebrow = "text-mint text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase";

export default async function ServicePage({ params }: Props) {
  const { locale, service } = await resolveParams(params);
  const t = await getTranslations({ locale });
  const content = getServiceContent(locale, service.slug);
  const Icon = SERVICE_ICONS[service.slug];
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd(locale, t, service, content)) }}
      />
      <Header />
      <main className="pt-16 sm:pt-20 lg:pt-28">
        <section className="bg-mint-light py-12 sm:py-16 lg:py-[10vh]">
          <div className="w-[90%] max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-gray-500 mb-8 sm:mb-10">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={`/${locale}`} className="hover:text-mint-dark transition-colors">
                    {t("servicePage.home")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-dark">{t(`services.${service.key}`)}</li>
              </ol>
            </nav>

            <Reveal>
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6 text-mint" />
                </div>
                <p className={eyebrow}>{t("services.subtitle")}</p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-dark leading-tight mb-6 sm:mb-8 text-balance">
                {content.title} <span className="block font-semibold">{content.titleHighlight}</span>
              </h1>
              <div className="space-y-4 text-gray-600 font-light leading-relaxed text-base sm:text-lg text-justify">
                {content.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 lg:py-[10vh]">
          <div className="w-[90%] max-w-4xl mx-auto space-y-12 sm:space-y-16">
            {content.sections.map((section) => (
              <Reveal key={section.heading}>
                <h2 className="text-2xl sm:text-3xl font-light text-dark mb-4 sm:mb-6">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-gray-600 font-light leading-relaxed text-justify mb-6">
                    {paragraph}
                  </p>
                ))}
                {section.items && section.steps && (
                  <ol className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {section.items.map((item, i) => (
                      <li key={item} className="bg-gray-50 p-4 sm:p-5 flex gap-4 items-start">
                        <span className="w-9 h-9 flex-shrink-0 bg-mint/10 text-mint font-semibold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-gray-600 font-light text-sm sm:text-base leading-relaxed pt-1.5">
                          <ItemText text={item} />
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
                {section.items && !section.steps && (
                  <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {section.items.map((item) => (
                      <li key={item} className="bg-gray-50 p-4 sm:p-5 flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-mint mt-0.5" />
                        <span className="text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                          <ItemText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-12 sm:py-16 lg:py-[10vh]">
          <div className="w-[90%] max-w-4xl mx-auto">
            <Reveal className="text-center mb-8 sm:mb-10">
              <p className={`${eyebrow} mb-4 sm:mb-6`}>{t(`services.${service.key}`)}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-dark">{t("servicePage.faqTitle")}</h2>
            </Reveal>
            <div className="space-y-3 sm:space-y-4">
              {content.faq.map(({ question, answer }, i) => (
                <Reveal key={question} delay={i * 0.05}>
                  <details className="group bg-white p-5 sm:p-6 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-dark text-sm sm:text-base">
                      {question}
                      <Plus className="w-5 h-5 flex-shrink-0 text-mint transition-transform group-open:rotate-45" aria-hidden="true" />
                    </summary>
                    <p className="mt-3 sm:mt-4 text-gray-600 font-light leading-relaxed text-justify text-sm sm:text-base">{answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 sm:mt-10 text-center text-gray-500 font-light text-xs sm:text-sm">{t("servicePage.disclaimer")}</p>
          </div>
        </section>

        <section className="bg-mint-light py-12 sm:py-16 lg:py-[10vh]">
          <Reveal className="w-[90%] max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-dark text-center mb-4 sm:mb-6 text-balance">
              {t("servicePage.ctaTitle")}
            </h2>
            <SectionCta>{t("servicePage.ctaText")}</SectionCta>
          </Reveal>
        </section>

        <section className="bg-white py-12 sm:py-16 lg:py-[10vh]">
          <div className="w-[90%] max-w-7xl mx-auto">
            <Reveal className="text-center mb-8 sm:mb-10">
              <p className={`${eyebrow} mb-4 sm:mb-6`}>{t("services.subtitle")}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-dark">{t("servicePage.otherServices")}</h2>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {otherServices.map(({ slug, key }) => {
                const OtherIcon = SERVICE_ICONS[slug];
                return (
                  <Link
                    key={slug}
                    href={servicePath(locale, slug)}
                    className="w-[calc(50%-6px)] sm:w-[calc(33.333%-10.667px)] md:w-[calc(20%-12.8px)] group bg-gray-50 p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mint/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-mint/20 transition-colors">
                      <OtherIcon className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-2 leading-tight">{t(`services.${key}`)}</h3>
                    <p className="text-gray-500 font-light text-[10px] sm:text-xs leading-relaxed hidden sm:block">{t(`services.${key}Desc`)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
