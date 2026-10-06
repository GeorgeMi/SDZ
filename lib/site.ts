import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.studiodezambete.ro";
export const SITE_NAME = "Studio de Zâmbete";

export const LOCALES = routing.locales;
export type Locale = (typeof LOCALES)[number];

export const PHONES = [
  { display: "0754 880 388", e164: "+40754880388" },
  { display: "0751 522 355", e164: "+40751522355" },
] as const;
export const PRIMARY_PHONE = PHONES[0];

export const EMAIL = "studiodezambete@gmail.com";
export const MAP_URL = "https://maps.app.goo.gl/GtHvA4HA9sG8NoV26";

export const ADDRESS = {
  streetAddress: "Str. Ion Creangă, bl. D5, sc. A, parter, ap. 1",
  addressLocality: "Moinești",
  addressRegion: "Bacău",
  postalCode: "605400",
  addressCountry: "RO",
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/studiodezambete",
  instagram: "https://www.instagram.com/studiodezambete/",
  tiktok: "https://www.tiktok.com/@studiodezambete",
  threads: "https://www.threads.com/@studiodezambete",
} as const;

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

// `labelKey` points into the `contactSection` messages; `hours: null` means closed.
export const SCHEDULE: { labelKey: string; days: DayOfWeek[]; hours: { opens: string; closes: string } | null }[] = [
  { labelKey: "scheduleDay1", days: ["Monday"], hours: { opens: "12:00", closes: "19:00" } },
  { labelKey: "scheduleDay2", days: ["Tuesday"], hours: { opens: "08:00", closes: "19:00" } },
  { labelKey: "scheduleDay3", days: ["Wednesday"], hours: { opens: "08:00", closes: "19:00" } },
  { labelKey: "scheduleDay4", days: ["Thursday"], hours: { opens: "09:00", closes: "18:00" } },
  { labelKey: "scheduleDay5", days: ["Friday"], hours: { opens: "09:00", closes: "18:00" } },
  { labelKey: "scheduleDay6", days: ["Saturday", "Sunday"], hours: null },
];

// `key` points into the `services` messages (`<key>` and `<key>Desc`).
export const SERVICES = [
  { slug: "profilaxie-dentara", key: "dentalProphylaxis" },
  { slug: "stomatologie-generala", key: "generalDentistry" },
  { slug: "stomatologie-pediatrica", key: "pediatricDentistry" },
  { slug: "ortodontie", key: "orthodontics" },
  { slug: "odontoterapie", key: "odontotherapy" },
  { slug: "parodontologie", key: "periodontology" },
  { slug: "endodontie", key: "endodontics" },
  { slug: "protetica-dentara", key: "dentalProsthetics" },
  { slug: "estetica-dentara", key: "dentalAesthetics" },
  { slug: "implantologie", key: "implantology" },
  { slug: "chirurgie-dentara", key: "dentalSurgery" },
] as const;
export type Service = (typeof SERVICES)[number];
export type ServiceSlug = Service["slug"];

export const servicePath = (locale: string, slug: ServiceSlug) => `/${locale}/servicii/${slug}`;

// Locale-prefixed so the links also work from sub-pages.
export const sectionHref = (locale: string, anchor: string) => `/${locale}#${anchor}`;

export type SiteImage = { src: string; width: number; height: number };

export const IMAGES = {
  logo: { src: "/logo.png", width: 500, height: 388 },
  interior: { src: "/interior-cabinet-stomatologic-studio-de-zambete.webp", width: 1535, height: 1024 },
  videoPoster: { src: "/tur_virtual_poster.jpg", width: 1920, height: 1080 },
  videoPosterVertical: { src: "/tur_virtual_vertical_poster.jpg", width: 800, height: 1422 },
  waitingArea: { src: "/zona-asteptare-studio-de-zambete.jpg", width: 4240, height: 2832 },
  entrance: { src: "/intrare-cabinet-studio-de-zambete.jpg", width: 4240, height: 2832 },
  reception: { src: "/receptie-studio-de-zambete.jpg", width: 4240, height: 2832 },
  dentalUnit: { src: "/unit-dentar-monitor-studio-de-zambete.png", width: 1448, height: 1086 },
  treatmentRoom: { src: "/sala-tratament-studio-de-zambete.png", width: 1535, height: 1024 },
} satisfies Record<string, SiteImage>;

type TeamMember = { id: number; slug: string; name: string; honorificPrefix?: string; image: SiteImage; objectPosition?: string };

// `id` matches the `team.doctor<id>*` messages.
export const TEAM: TeamMember[] = [
  { id: 1, slug: "stefan", name: "Ștefan Agavriloaie", honorificPrefix: "Dr.", image: { src: "/dr_stefan_agavrilaoie.jpg", width: 2832, height: 4240 }, objectPosition: "60% 0%" },
  { id: 2, slug: "mihai", name: "Mihai Handîc", honorificPrefix: "Dr.", image: { src: "/dr_mihai_handic.jpg", width: 2814, height: 3992 } },
  { id: 3, slug: "hadi", name: "Hadi Khodr", honorificPrefix: "Dr.", image: { src: "/dr_hadi_khodr.jpg", width: 2778, height: 4229 } },
  { id: 4, slug: "manuela", name: "Manuela Antochi", honorificPrefix: "Dr.", image: { src: "/dr_manuela_antochi.jpg", width: 2832, height: 4240 } },
  { id: 5, slug: "vlad", name: "Vlad Stanciu", honorificPrefix: "Dr.", image: { src: "/dr_vlad_stanciu.jpg", width: 2770, height: 4218 } },
  { id: 6, slug: "diana", name: "Diana Ciobanu", image: { src: "/as_diana_ciobanu.jpg", width: 2832, height: 4240 } },
];

export const VIDEO_TOUR = {
  src: "/tur_virtual.mp4",
  srcVertical: "/tur_virtual_vertical.mp4",
  duration: "PT47.273S",
  uploadDate: "2026-05-25T14:48:00+03:00",
} as const;
