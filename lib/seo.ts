// Visible texts come from the translation messages so the JSON-LD always matches the page.
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  ADDRESS,
  EMAIL,
  IMAGES,
  MAP_URL,
  PHONES,
  SCHEDULE,
  SERVICES,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  TEAM,
  VIDEO_TOUR,
  servicePath,
  type Locale,
  type Service,
  type ServiceSlug,
  type SiteImage,
} from "@/lib/site";
import type { ServiceContent } from "@/lib/services";

type Translate = (key: string) => string;

type JsonLdValue = string | number | boolean | null | undefined | JsonLdValue[] | { [property: string]: JsonLdValue };
type JsonLdNode = { [property: string]: JsonLdValue };

const LANGUAGE_TAGS: Record<Locale, string> = { ro: "ro-RO", en: "en" };

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/** Canonical + hreflang alternates for a path present in every locale, e.g. "", "/privacy". */
export function localeAlternates(locale: Locale, path = "") {
  return {
    canonical: absoluteUrl(`/${locale}${path}`),
    languages: {
      ro: absoluteUrl(`/ro${path}`),
      en: absoluteUrl(`/en${path}`),
      "x-default": absoluteUrl(`/ro${path}`),
    },
  };
}

/** Metadata for the privacy/terms pages, whose client components cannot export it. */
export async function legalPageMetadata(params: Promise<{ locale: string }>, page: "privacy" | "terms"): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t(`${page}Title`), alternates: localeAlternates(locale, `/${page}`) };
}

/** Next.js replaces (not merges) these objects, so every page sets them in full. */
export function socialMetadata(locale: Locale, url: string, title: string, description: string) {
  const image = { url: absoluteUrl(IMAGES.dentalUnit.src), width: IMAGES.dentalUnit.width, height: IMAGES.dentalUnit.height };
  return {
    openGraph: {
      type: "website" as const,
      locale: locale === "ro" ? "ro_RO" : "en_US",
      alternateLocale: locale === "ro" ? "en_US" : "ro_RO",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [image.url] },
  };
}

/** Serializes JSON-LD for a <script> tag; escaping "<" prevents breaking out of the element. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ref = (id: string) => ({ "@id": id });
const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");
const serviceId = (slug: ServiceSlug) => absoluteUrl(`/#service-${slug}`);
const personId = (slug: string) => absoluteUrl(`/#person-${slug}`);
const contactPointId = (index: number) => absoluteUrl(`/#contact-programari-${index + 1}`);

function imageNode(id: string, image: SiteImage, name: string): JsonLdNode {
  const url = absoluteUrl(image.src);
  return { "@type": "ImageObject", "@id": id, contentUrl: url, url, name, width: image.width, height: image.height };
}

function organizationNodes(t: Translate, pageUrl: string): JsonLdNode[] {
  const logoId = `${pageUrl}#image-logo`;
  return [
    {
      "@type": "Dentist",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: absoluteUrl("/ro"),
      description: t("metadata.homeDescription"),
      logo: ref(logoId),
      image: absoluteUrl(IMAGES.dentalUnit.src),
      telephone: PHONES.map((phone) => phone.e164),
      email: EMAIL,
      address: { "@type": "PostalAddress", ...ADDRESS },
      hasMap: MAP_URL,
      contactPoint: PHONES.map((_, i) => ref(contactPointId(i))),
      // Closed days use 00:00–00:00, as recommended by Google for local businesses.
      openingHoursSpecification: SCHEDULE.map(({ days, hours }) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days.map((day) => `https://schema.org/${day}`),
        opens: hours?.opens ?? "00:00",
        closes: hours?.closes ?? "00:00",
      })),
      sameAs: Object.values(SOCIAL_LINKS),
    },
    ...PHONES.map((phone, i) => ({
      "@type": "ContactPoint",
      "@id": contactPointId(i),
      contactType: t("metadata.contactType"),
      telephone: phone.e164,
      email: EMAIL,
      url: absoluteUrl("/ro#contact"),
    })),
    imageNode(logoId, IMAGES.logo, SITE_NAME),
    { "@type": "WebSite", "@id": WEBSITE_ID, url: absoluteUrl("/"), name: SITE_NAME, publisher: ref(ORGANIZATION_ID) },
  ];
}

function serviceNode(t: Translate, locale: Locale, slug: ServiceSlug, key: string): JsonLdNode {
  const name = t(`services.${key}`);
  return {
    "@type": "Service",
    "@id": serviceId(slug),
    name,
    serviceType: name,
    description: t(`services.${key}Desc`),
    provider: ref(ORGANIZATION_ID),
    areaServed: { "@type": "City", name: ADDRESS.addressLocality },
    url: absoluteUrl(servicePath(locale, slug)),
  };
}

export function homeJsonLd(locale: Locale, t: Translate) {
  const pageUrl = absoluteUrl(`/${locale}`);
  const pageId = `${pageUrl}#webpage`;
  const inLanguage = LANGUAGE_TAGS[locale];
  const heading = (ns: string) => `${t(`${ns}.title`)} ${t(`${ns}.titleHighlight`)}`;
  const imageId = (name: string) => `${pageUrl}#image-${name}`;
  const videoId = `${pageUrl}#video-tur-cabinet`;

  const gallery = [
    { name: "asteptare", image: IMAGES.waitingArea, alt: t("gallery.waitingAreaAlt") },
    { name: "intrare", image: IMAGES.entrance, alt: t("gallery.entranceAlt") },
    { name: "receptie", image: IMAGES.reception, alt: t("gallery.receptionAlt") },
    { name: "unit-dentar", image: IMAGES.dentalUnit, alt: t("gallery.dentalUnitAlt") },
    { name: "sala-tratament", image: IMAGES.treatmentRoom, alt: t("gallery.treatmentRoomAlt") },
  ];
  const imageNodes = [
    imageNode(imageId("interior"), IMAGES.interior, t("welcome.imageAlt")),
    ...TEAM.map((member) => imageNode(imageId(member.slug), member.image, t(`team.doctor${member.id}Alt`))),
    imageNode(imageId("video-poster"), IMAGES.videoPoster, t("gallery.videoAlt")),
    ...gallery.map(({ name, image, alt }) => imageNode(imageId(name), image, alt)),
  ];

  const sections: JsonLdNode[] = [
    { anchor: "acasa", name: t("hero.title"), about: ref(ORGANIZATION_ID) },
    { anchor: "despre", name: heading("welcome"), about: ref(ORGANIZATION_ID), image: ref(imageId("interior")) },
    { anchor: "echipa", name: heading("team"), mainEntity: ref(`${pageUrl}#team-list`) },
    { anchor: "servicii", name: heading("services"), mainEntity: ref(`${pageUrl}#services-list`) },
    {
      anchor: "dotari",
      name: heading("equipment"),
      about: ["facialScanner", "intraoralScanner", "intraoralCamera", "laser", "shadeDetector", "endomotor", "apexLocator", "autoclave"]
        .map((key) => ({ "@type": "Thing", name: t(`equipment.${key}`) })),
    },
    {
      anchor: "galerie",
      name: heading("gallery"),
      image: gallery.map(({ name }) => ref(imageId(name))),
      associatedMedia: [ref(imageId("video-poster")), ref(videoId)],
    },
    { anchor: "contact", name: heading("contactSection"), about: ref(ORGANIZATION_ID) },
  ].map(({ anchor, ...data }) => ({
    "@type": "WebPageElement",
    "@id": `${pageUrl}#${anchor}`,
    url: `${pageUrl}#${anchor}`,
    inLanguage,
    isPartOf: ref(pageId),
    ...data,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...organizationNodes(t, pageUrl),
      {
        "@type": "WebPage",
        "@id": pageId,
        url: pageUrl,
        name: t("metadata.homeTitle"),
        description: t("metadata.homeDescription"),
        inLanguage,
        isPartOf: ref(WEBSITE_ID),
        mainEntity: ref(ORGANIZATION_ID),
        about: ref(ORGANIZATION_ID),
        primaryImageOfPage: ref(imageId("unit-dentar")),
        image: imageNodes.map((node) => ref(node["@id"] as string)),
        hasPart: sections.map((section) => ref(section["@id"] as string)),
      },
      ...sections,
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#team-list`,
        name: heading("team"),
        itemListElement: TEAM.map((member, i) => ({ "@type": "ListItem", position: i + 1, item: ref(personId(member.slug)) })),
      },
      ...TEAM.map((member) => ({
        "@type": "Person",
        "@id": personId(member.slug),
        name: member.name,
        honorificPrefix: member.honorificPrefix,
        jobTitle: t(`team.doctor${member.id}Role`).replace(/\s+/g, " "),
        image: ref(imageId(member.slug)),
        affiliation: ref(ORGANIZATION_ID),
      })),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#services-list`,
        name: heading("services"),
        itemListElement: SERVICES.map(({ slug }, i) => ({ "@type": "ListItem", position: i + 1, item: ref(serviceId(slug)) })),
      },
      ...SERVICES.map(({ slug, key }) => serviceNode(t, locale, slug, key)),
      ...imageNodes,
      {
        "@type": "VideoObject",
        "@id": videoId,
        name: t("gallery.videoAlt"),
        description: t("gallery.description"),
        contentUrl: absoluteUrl(VIDEO_TOUR.src),
        thumbnailUrl: absoluteUrl(IMAGES.videoPoster.src),
        uploadDate: VIDEO_TOUR.uploadDate,
        duration: VIDEO_TOUR.duration,
        inLanguage,
        isPartOf: ref(`${pageUrl}#galerie`),
      },
    ],
  };
}

export function serviceJsonLd(locale: Locale, t: Translate, service: Service, content: ServiceContent) {
  const { slug, key } = service;
  const pageUrl = absoluteUrl(servicePath(locale, slug));
  const pageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...organizationNodes(t, pageUrl),
      {
        "@type": ["WebPage", "FAQPage"],
        "@id": pageId,
        url: pageUrl,
        name: content.metaTitle,
        description: content.metaDescription,
        inLanguage: LANGUAGE_TAGS[locale],
        isPartOf: ref(WEBSITE_ID),
        about: ref(serviceId(slug)),
        breadcrumb: ref(breadcrumbId),
        mainEntity: content.faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("servicePage.home"), item: absoluteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: t(`services.${key}`), item: pageUrl },
        ],
      },
      serviceNode(t, locale, slug, key),
    ],
  };
}
