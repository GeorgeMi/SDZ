import type { Locale, ServiceSlug } from "@/lib/site";
import { ro } from "./ro";
import { en } from "./en";

export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleHighlight: string;
  intro: string[];
  sections: { heading: string; paragraphs?: string[]; items?: string[]; steps?: boolean }[];
  faq: { question: string; answer: string }[];
};

export type ServiceContentMap = Record<ServiceSlug, ServiceContent>;

const content: Record<Locale, ServiceContentMap> = { ro, en };

export function getServiceContent(locale: Locale, slug: ServiceSlug): ServiceContent {
  return content[locale][slug];
}
