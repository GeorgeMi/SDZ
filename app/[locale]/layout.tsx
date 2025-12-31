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

export const metadata: Metadata = {
  metadataBase: new URL("https://studiodezambete.ro"),
  title: {
    default: "Studio de Zâmbete | Cabinet stomatologic Moinești",
    template: "%s | Studio de Zâmbete",
  },
  description: "Clinică stomatologică premium în Moinești. Tehnologie de ultimă generație, echipă de specialiști dedicați și servicii complete: implantologie, estetică dentară, ortodonție.",
  keywords: ["stomatologie premium", "dentist Moinești", "clinică dentară", "implant dentar", "estetică dentară", "albire dentară", "ortodonție", "stomatologie copii"],
  authors: [{ name: "Studio de Zâmbete" }],
  creator: "Studio de Zâmbete",
  publisher: "Studio de Zâmbete",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://studiodezambete.ro",
    siteName: "Studio de Zâmbete",
    title: "Studio de Zâmbete | Cabinet stomatologic Moinești",
    description: "Redefinim experiența stomatologică. Tehnologie de ultimă generație într-un ambient premium.",
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
    description: "Redefinim experiența stomatologică. Tehnologie de ultimă generație într-un ambient premium.",
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
    google: "your-google-verification-code",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ro' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
