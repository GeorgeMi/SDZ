import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Team from "@/components/Team";
import Services from "@/components/Services";
import Equipment from "@/components/Equipment";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/site";
import { homeJsonLd, localeAlternates, serializeJsonLd, socialMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const alternates = localeAlternates(locale);

  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
    alternates,
    ...socialMetadata(locale, alternates.canonical, t("homeTitle"), t("homeDescription")),
  };
}

export default async function Home({ params }: Props) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd(locale, t)) }}
      />
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Team />
        <Services />
        <Equipment />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
