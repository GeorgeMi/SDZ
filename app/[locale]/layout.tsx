import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const baseUrl = "https://studiodezambete.ro";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRomanian = locale === "ro";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isRomanian
        ? "Studio de Zâmbete | Cabinet stomatologic Moinești"
        : "Studio de Zâmbete | Dental Clinic Moinești",
      template: "%s | Studio de Zâmbete",
    },
    description: isRomanian
      ? "Clinică stomatologică premium în Moinești. Tehnologie de ultimă generație, echipă de specialiști dedicați și servicii complete: implantologie, estetică dentară, ortodonție."
      : "Premium dental clinic in Moinești. State-of-the-art technology, dedicated team of specialists and complete services: implantology, dental aesthetics, orthodontics.",
    keywords: isRomanian
      ? ["stomatologie premium", "dentist Moinești", "clinică dentară", "implant dentar", "estetică dentară", "albire dentară", "ortodonție", "stomatologie copii"]
      : ["premium dentistry", "dentist Moinești", "dental clinic", "dental implant", "dental aesthetics", "teeth whitening", "orthodontics", "pediatric dentistry"],
    authors: [{ name: "Studio de Zâmbete" }],
    creator: "Studio de Zâmbete",
    publisher: "Studio de Zâmbete",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "ro": `${baseUrl}/ro`,
        "en": `${baseUrl}/en`,
        "x-default": `${baseUrl}/ro`,
      },
    },
    openGraph: {
      type: "website",
      locale: isRomanian ? "ro_RO" : "en_US",
      alternateLocale: isRomanian ? "en_US" : "ro_RO",
      url: `${baseUrl}/${locale}`,
      siteName: "Studio de Zâmbete",
      title: isRomanian
        ? "Studio de Zâmbete | Cabinet stomatologic Moinești"
        : "Studio de Zâmbete | Dental Clinic Moinești",
      description: isRomanian
        ? "Redefinim experiența stomatologică. Tehnologie de ultimă generație într-un ambient premium."
        : "Redefining the dental experience. State-of-the-art technology in a premium setting.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Studio de Zâmbete - Cabinet stomatologic",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Studio de Zâmbete | Cabinet stomatologic",
      description: isRomanian
        ? "Redefinim experiența stomatologică. Tehnologie de ultimă generație într-un ambient premium."
        : "Redefining the dental experience. State-of-the-art technology in a premium setting.",
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "6QcoeRY8_d_NK5b9Wca9qMHyBS2JpL-GP71BSVA090Q",
    },
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ro' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Studio de Zâmbete",
    "description": "Cabinet stomatologic premium în Moinești. Tehnologie de ultimă generație, echipă de specialiști dedicați.",
    "url": "https://studiodezambete.ro",
    "telephone": ["+40754880388", "+40751522355"],
    "email": "studiodezambete@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Str. Ion Creangă, bl. D5, sc. A, parter, ap. 1",
      "addressLocality": "Moinești",
      "addressRegion": "Bacău",
      "postalCode": "605400",
      "addressCountry": "RO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "46.4833",
      "longitude": "26.4833"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Monday",
        "opens": "12:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "$$",
    "image": "https://studiodezambete.ro/og-image.jpg",
    "sameAs": [
      "https://maps.app.goo.gl/GtHvA4HA9sG8NoV26"
    ],
    "medicalSpecialty": [
      "Dentistry",
      "Orthodontics",
      "Oral Surgery",
      "Pediatric Dentistry",
      "Endodontics",
      "Periodontics",
      "Prosthodontics"
    ],
    "availableService": [
      {"@type": "MedicalProcedure", "name": "Profilaxie dentară"},
      {"@type": "MedicalProcedure", "name": "Stomatologie generală"},
      {"@type": "MedicalProcedure", "name": "Stomatologie pediatrică"},
      {"@type": "MedicalProcedure", "name": "Implantologie"},
      {"@type": "MedicalProcedure", "name": "Ortodonție"},
      {"@type": "MedicalProcedure", "name": "Chirurgie dentară"},
      {"@type": "MedicalProcedure", "name": "Estetică dentară"},
      {"@type": "MedicalProcedure", "name": "Endodonție"},
      {"@type": "MedicalProcedure", "name": "Parodontologie"},
      {"@type": "MedicalProcedure", "name": "Protetică dentară"}
    ]
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
