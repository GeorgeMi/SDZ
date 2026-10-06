import type { MetadataRoute } from "next";
import { LOCALES, SERVICES, servicePath } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

// One entry per locale, each listing all language versions as alternates.
function localized(
  pathFor: (locale: string) => string,
  changeFrequency: Entry["changeFrequency"],
  priority: (locale: string) => number,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((locale) => [locale, absoluteUrl(pathFor(locale))]));
  return LOCALES.map((locale) => ({
    url: absoluteUrl(pathFor(locale)),
    lastModified: new Date(),
    changeFrequency,
    priority: priority(locale),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized((locale) => `/${locale}`, "monthly", (locale) => (locale === "ro" ? 1 : 0.9)),
    ...SERVICES.flatMap(({ slug }) =>
      localized((locale) => servicePath(locale, slug), "monthly", (locale) => (locale === "ro" ? 0.8 : 0.7)),
    ),
    ...localized((locale) => `/${locale}/privacy`, "yearly", () => 0.3),
    ...localized((locale) => `/${locale}/terms`, "yearly", () => 0.3),
  ];
}
