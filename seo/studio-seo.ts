import type { Metadata } from 'next';

export type ImageKey =
  | 'logo' | 'about' | 'stefan' | 'mihai' | 'hadi' | 'manuela'
  | 'vlad' | 'diana' | 'video-poster' | 'asteptare' | 'intrare'
  | 'receptie' | 'unit-dentar' | 'sala-tratament';

export interface StudioImage {
  key: ImageKey;
  file: string;
  oldFile?: string;
  alt: string;
  name: string;
  width?: number;
  height?: number;
  encodingFormat?: string;
}

export interface TeamMember {
  key: ImageKey;
  name: string;
  honorificPrefix?: string;
  jobTitle: string;
}

export interface StudioService {
  slug: string;
  name: string;
  description: string;
}

// JSON-LD values, including optional properties omitted by JSON.stringify.
export type JsonLdValue =
  | string | number | boolean | null | undefined
  | JsonLdValue[]
  | { [property: string]: JsonLdValue };

export type JsonLdReference = {
  '@id': string;
};

export interface StudioJsonLd {
  '@context': string;
  '@graph': { [property: string]: JsonLdValue }[];
}

export const SITE_URL = 'https://studiodezambete.ro';
export const PAGE_URL = `${SITE_URL}/ro`;
// Image URLs retain the currently observed www asset host.
export const ASSET_URL = 'https://www.studiodezambete.ro';
export const TITLE = 'Studio de Zâmbete | Cabinet stomatologic în Moinești';
export const DESCRIPTION = 'Studio de Zâmbete, cabinet stomatologic în Moinești: stomatologie generală și pediatrică, ortodonție, implantologie și estetică dentară. Programează-te online.';

export const images: StudioImage[] = [
  { key: 'logo', file: 'logo.png', alt: 'Studio de Zâmbete', name: 'Logo Studio de Zâmbete' },
  { key: 'about', file: 'about_us.webp', alt: 'Dinți și oglindă dentară în timpul examinării', name: 'Examinare dentară cu oglindă' },
  { key: 'stefan', file: 'dr_stefan_agavrilaoie.jpg', alt: 'Dr. Ștefan Agavriloaie, medic stomatolog generalist', name: 'Dr. Ștefan Agavriloaie' },
  { key: 'mihai', file: 'dr_mihai_handic.jpg', alt: 'Dr. Mihai Handîc, medic specialist în chirurgie dento-alveolară', name: 'Dr. Mihai Handîc' },
  { key: 'hadi', file: 'dr_hadi_khodr.jpg', alt: 'Dr. Hadi Khodr, medic specialist în ortodonție și ortopedie dento-facială', name: 'Dr. Hadi Khodr' },
  { key: 'manuela', file: 'dr_manuela_antochi.jpg', alt: 'Dr. Manuela Antochi, medic stomatolog generalist', name: 'Dr. Manuela Antochi' },
  { key: 'vlad', file: 'dr_vlad_stanciu.jpg', alt: 'Dr. Vlad Stanciu, medic stomatolog generalist', name: 'Dr. Vlad Stanciu' },
  { key: 'diana', file: 'as_diana_ciobanu.jpg', alt: 'Diana Ciobanu, asistent medical generalist', name: 'Diana Ciobanu' },
  { key: 'video-poster', file: 'tur_virtual_poster.jpg', alt: 'Turul video al cabinetului Studio de Zâmbete', name: 'Miniatura turului video al cabinetului Studio de Zâmbete' },
  { key: 'asteptare', oldFile: 'cabinet_2.jpg', file: 'zona-asteptare-studio-de-zambete.jpg', alt: 'Zona de așteptare a cabinetului stomatologic din Moinești', name: 'Zona de așteptare a cabinetului Studio de Zâmbete', width: 4240, height: 2832, encodingFormat: 'image/jpeg' },
  { key: 'intrare', oldFile: 'cabinet_1.jpg', file: 'intrare-cabinet-studio-de-zambete.jpg', alt: 'Intrare în zona de așteptare a cabinetului stomatologic Studio de Zâmbete', name: 'Intrarea în cabinetul Studio de Zâmbete', width: 4240, height: 2832, encodingFormat: 'image/jpeg' },
  { key: 'receptie', oldFile: 'cabinet_3.jpg', file: 'receptie-studio-de-zambete.jpg', alt: 'Recepția cabinetului dentar Studio de Zâmbete', name: 'Recepția cabinetului Studio de Zâmbete', width: 4240, height: 2832, encodingFormat: 'image/jpeg' },
  { key: 'unit-dentar', oldFile: 'cabinet_4.png', file: 'unit-dentar-monitor-studio-de-zambete.png', alt: 'Scaun stomatologic și monitor la Studio de Zâmbete', name: 'Unitul dentar și monitorul din spațiul de tratament', width: 1448, height: 1086, encodingFormat: 'image/png' },
  { key: 'sala-tratament', oldFile: 'cabinet_5.png', file: 'sala-tratament-studio-de-zambete.png', alt: 'Sală de tratament stomatologic la Studio de Zâmbete', name: 'Spațiu de tratament cu unit dentar și lampă', width: 1535, height: 1024, encodingFormat: 'image/png' },
];

export const team: TeamMember[] = [
  { key: 'stefan', name: 'Ștefan Agavriloaie', honorificPrefix: 'Dr.', jobTitle: 'Medic stomatolog generalist' },
  { key: 'mihai', name: 'Mihai Handîc', honorificPrefix: 'Dr.', jobTitle: 'Medic specialist în chirurgie dento-alveolară' },
  { key: 'hadi', name: 'Hadi Khodr', honorificPrefix: 'Dr.', jobTitle: 'Medic specialist în ortodonție și ortopedie dento-facială' },
  { key: 'manuela', name: 'Manuela Antochi', honorificPrefix: 'Dr.', jobTitle: 'Medic stomatolog generalist' },
  { key: 'vlad', name: 'Vlad Stanciu', honorificPrefix: 'Dr.', jobTitle: 'Medic stomatolog generalist' },
  { key: 'diana', name: 'Diana Ciobanu', jobTitle: 'Asistent medical generalist' },
];

export const services: StudioService[] = [
  { slug: 'profilaxie-dentara', name: 'Profilaxie dentară', description: 'Curățare și prevenție profesională' },
  { slug: 'stomatologie-generala', name: 'Stomatologie generală', description: 'Consultații și tratamente complete' },
  { slug: 'stomatologie-pediatrica', name: 'Stomatologie pediatrică', description: 'Îngrijire dentară pentru copii' },
  { slug: 'ortodontie', name: 'Ortodonție', description: 'Aparate dentare și alinierea dinților' },
  { slug: 'odontoterapie', name: 'Odontoterapie', description: 'Tratamente restaurative' },
  { slug: 'parodontologie', name: 'Parodontologie', description: 'Tratamente pentru gingii' },
  { slug: 'endodontie', name: 'Endodonție', description: 'Tratamente de canal' },
  { slug: 'protetica-dentara', name: 'Protetică dentară', description: 'Coroane și punți dentare' },
  { slug: 'estetica-dentara', name: 'Estetică dentară', description: 'Fațete și albiri profesionale' },
  { slug: 'implantologie', name: 'Implantologie', description: 'Implanturi dentare' },
  { slug: 'chirurgie-dentara', name: 'Chirurgie dentară', description: 'Extracții și intervenții complexe' },
];

const ref = (id: string): JsonLdReference => ({ '@id': id });
const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const pageId = `${PAGE_URL}#webpage`;
const personId = (key: ImageKey): string => `${SITE_URL}/#person-${key}`;
const serviceId = (slug: string): string => `${SITE_URL}/#service-${slug}`;
const imageId = (key: ImageKey): string => key === 'unit-dentar' ? `${PAGE_URL}#primaryimage` : `${PAGE_URL}#image-${key}`;
const imageRef = (key: ImageKey): JsonLdReference => ref(imageId(key));
const galleryKeys: ImageKey[] = ['asteptare', 'intrare', 'receptie', 'unit-dentar', 'sala-tratament'];
const imageNodes = images.map(({ key, file, name, width, height, encodingFormat }) => ({
  '@type': 'ImageObject',
  '@id': imageId(key),
  contentUrl: `${ASSET_URL}/${file}`,
  url: `${ASSET_URL}/${file}`,
  name,
  ...(width ? { width, height } : {}),
  ...(encodingFormat ? { encodingFormat } : {}),
}));

const sections = [
  { anchor: 'acasa', name: 'Zâmbetul tău, preocuparea noastră', about: ref(organizationId) },
  { anchor: 'despre', name: 'Inspirați de excelență, dedicați zâmbetului tău', about: ref(organizationId), image: imageRef('about') },
  { anchor: 'echipa', name: 'Medicii care îți definesc zâmbetul', mainEntity: ref(`${PAGE_URL}#team-list`) },
  { anchor: 'servicii', name: 'Soluții complete', mainEntity: ref(`${PAGE_URL}#services-list`) },
  { anchor: 'dotari', name: 'Tehnologie de vârf', about: ['Scanner facial 3D', 'Scanner intraoral', 'Cameră intraorală', 'Laser dentar', 'Detector de culoare dentară', 'Endomotor', 'Apex locator', 'Autoclav'].map(name => ({ '@type': 'Thing', name })) },
  { anchor: 'galerie', name: 'Tur virtual al cabinetului', image: galleryKeys.map(imageRef), associatedMedia: [imageRef('video-poster'), ref(`${PAGE_URL}#video-tur-cabinet`)] },
  { anchor: 'contact', name: 'Programează-te acum', about: ref(organizationId) },
];

export const jsonLd: StudioJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Dentist',
      '@id': organizationId,
      name: 'Studio de Zâmbete',
      url: PAGE_URL,
      description: DESCRIPTION,
      logo: imageRef('logo'),
      image: imageRef('unit-dentar'),
      telephone: ['+40754880388', '+40751522355'],
      email: 'studiodezambete@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Str. Ion Creangă, bl. D5, sc. A, parter, ap. 1',
        addressLocality: 'Moinești',
        addressRegion: 'Bacău',
        addressCountry: 'RO',
      },
      hasMap: 'https://maps.app.goo.gl/GtHvA4HA9sG8NoV26',
      contactPoint: [ref(`${SITE_URL}/#contact-programari-1`), ref(`${SITE_URL}/#contact-programari-2`)],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/Monday', opens: '12:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Tuesday', 'https://schema.org/Wednesday'], opens: '08:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Thursday', 'https://schema.org/Friday'], opens: '09:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Saturday', 'https://schema.org/Sunday'], opens: '00:00', closes: '00:00' },
      ],
      sameAs: [
        'https://www.facebook.com/drstefanagavriloaie/',
        'https://www.instagram.com/studiodezambete/',
        'https://www.tiktok.com/@studiodezambete',
        'https://www.threads.com/@studiodezambete',
      ],
    },
    { '@type': 'WebSite', '@id': websiteId, url: SITE_URL, name: 'Studio de Zâmbete', publisher: ref(organizationId) },
    {
      '@type': 'WebPage', '@id': pageId, url: PAGE_URL, name: TITLE, description: DESCRIPTION, inLanguage: 'ro-RO',
      isPartOf: ref(websiteId), mainEntity: ref(organizationId), about: ref(organizationId),
      primaryImageOfPage: imageRef('unit-dentar'), image: images.map(x => imageRef(x.key)),
      hasPart: sections.map(x => ref(`${PAGE_URL}#${x.anchor}`)),
    },
    ...['+40754880388', '+40751522355'].map((telephone, index) => ({
      '@type': 'ContactPoint', '@id': `${SITE_URL}/#contact-programari-${index + 1}`,
      contactType: 'Programări și informații', telephone, email: 'studiodezambete@gmail.com', url: `${PAGE_URL}#contact`,
    })),
    ...sections.map(({ anchor, ...data }) => ({
      '@type': 'WebPageElement', '@id': `${PAGE_URL}#${anchor}`, url: `${PAGE_URL}#${anchor}`,
      inLanguage: 'ro-RO', isPartOf: ref(pageId), ...data,
    })),
    {
      '@type': 'ItemList', '@id': `${PAGE_URL}#team-list`, name: 'Echipa Studio de Zâmbete',
      itemListElement: team.map((person, index) => ({ '@type': 'ListItem', position: index + 1, item: ref(personId(person.key)) })),
    },
    ...team.map(({ key, ...person }) => ({
      '@type': 'Person', '@id': personId(key), ...person, image: imageRef(key), affiliation: ref(organizationId),
    })),
    {
      '@type': 'ItemList', '@id': `${PAGE_URL}#services-list`, name: 'Servicii stomatologice Studio de Zâmbete',
      itemListElement: services.map((service, index) => ({ '@type': 'ListItem', position: index + 1, item: ref(serviceId(service.slug)) })),
    },
    ...services.map(({ slug, name, description }) => ({
      '@type': 'Service', '@id': serviceId(slug), name, serviceType: name, description,
      provider: ref(organizationId), url: `${PAGE_URL}#servicii`,
    })),
    ...imageNodes,
    {
      '@type': 'VideoObject', '@id': `${PAGE_URL}#video-tur-cabinet`,
      name: 'Turul video al cabinetului Studio de Zâmbete',
      description: 'Prezentare video a interiorului cabinetului Studio de Zâmbete din Moinești.',
      contentUrl: `${ASSET_URL}/tur_virtual.mp4`,
      thumbnailUrl: `${ASSET_URL}/tur_virtual_poster.jpg`,
      duration: 'PT47.273S', inLanguage: 'ro-RO', isPartOf: ref(`${PAGE_URL}#galerie`),
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website', locale: 'ro_RO', url: PAGE_URL, siteName: 'Studio de Zâmbete', title: TITLE, description: DESCRIPTION,
    images: [{ url: `${ASSET_URL}/unit-dentar-monitor-studio-de-zambete.png`, width: 1448, height: 1086, alt: 'Scaun stomatologic și monitor la Studio de Zâmbete' }],
  },
};

export function serializeJsonLd(data: unknown = jsonLd): string {
  const serialized = JSON.stringify(data);
  if (serialized === undefined) {
    throw new TypeError('JSON-LD data must be JSON serializable.');
  }
  return serialized.replace(/</g, '\\u003c');
}

export function getImage(key: ImageKey): StudioImage & { src: string; schemaId: string } {
  const image = images.find(image => image.key === key);
  if (!image) throw new Error(`Unknown image key: ${key}`);
  return { ...image, src: `/${image.file}`, schemaId: imageId(key) };
}
