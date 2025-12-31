"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

type BulletItem = { bold?: string; text: string };

type Section = {
  title: string;
  paragraphs?: string[];
  list?: { label: string; value: string }[];
  bulletList?: BulletItem[];
  footer?: string;
  privacyLink?: boolean;
};

type Content = {
  sections: Section[];
};

export default function Terms() {
  const t = useTranslations("common");
  const tTerms = useTranslations("terms");
  const locale = useLocale();

  const content: Content = locale === "ro" ? {
    sections: [
      {
        title: "1. Informații generale",
        paragraphs: [
          "Acest site web este operat de Studio de Zâmbete, cabinet stomatologic cu sediul în Moinești, Strada Ion Creangă, bl. D5, sc. A, parter, ap. 1.",
          "Prin accesarea și utilizarea acestui site, acceptați să respectați acești termeni și condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați site-ul nostru."
        ]
      },
      {
        title: "2. Serviciile noastre",
        paragraphs: ["Studio de Zâmbete oferă servicii stomatologice profesionale, inclusiv:"],
        bulletList: [
          { text: "Profilaxie dentară și consultații" },
          { text: "Stomatologie generală și pediatrică" },
          { text: "Odontoterapie și parodontologie" },
          { text: "Endodonție (tratamente de canal)" },
          { text: "Protetică și estetică dentară" },
          { text: "Implantologie și chirurgie dentară" }
        ],
        footer: "Toate serviciile sunt furnizate de medici stomatologi autorizați, în conformitate cu legislația în vigoare din România."
      },
      {
        title: "3. Programări",
        paragraphs: ["Programările pot fi efectuate prin:"],
        bulletList: [
          { text: "Telefon: 0754 880 388 sau 0751 522 355" },
          { text: "Formularul de contact de pe site" },
          { text: "Email: studiodezambete@gmail.com" }
        ],
        footer: "Confirmarea programării: Veți primi o confirmare a programării prin telefon sau email. Programarea este considerată fermă doar după confirmare."
      },
      {
        title: "4. Anulări și reprogramări",
        paragraphs: [
          "Vă rugăm să ne anunțați cu cel puțin 24 de ore înainte dacă nu puteți onora o programare. Acest lucru ne permite să oferim locul altui pacient care are nevoie de îngrijire.",
          "Pentru anulări sau reprogramări, ne puteți contacta telefonic la 0754 880 388."
        ]
      },
      {
        title: "5. Prețuri și plăți",
        paragraphs: [
          "Prețurile serviciilor sunt comunicate înainte de începerea tratamentului. La prima consultație, veți primi un plan de tratament detaliat cu costurile aferente.",
          "Metode de plată acceptate:"
        ],
        bulletList: [
          { text: "Numerar" },
          { text: "Card bancar" }
        ],
        footer: "Pentru tratamente complexe, pot fi disponibile opțiuni de plată în rate. Discutați cu echipa noastră pentru detalii."
      },
      {
        title: "6. Conținutul site-ului",
        paragraphs: [
          "Informațiile prezentate pe acest site au caracter informativ general și nu constituie sfat medical. Pentru diagnostic și tratament, este necesară o consultație la cabinet.",
          "Ne străduim să menținem informațiile actualizate și corecte, dar nu garantăm completitudinea sau acuratețea acestora în orice moment."
        ]
      },
      {
        title: "7. Proprietate intelectuală",
        paragraphs: [
          "Toate materialele de pe acest site (texte, imagini, logo, design) sunt proprietatea Studio de Zâmbete sau sunt utilizate cu permisiune. Este interzisă copierea, reproducerea sau distribuirea acestor materiale fără acordul nostru scris."
        ]
      },
      {
        title: "8. Limitarea răspunderii",
        paragraphs: ["Studio de Zâmbete nu este responsabil pentru:"],
        bulletList: [
          { text: "Decizii luate pe baza informațiilor de pe site fără consultație medicală" },
          { text: "Întreruperi temporare ale funcționării site-ului" },
          { text: "Linkuri către site-uri externe" }
        ]
      },
      {
        title: "9. Confidențialitatea datelor",
        paragraphs: ["Prelucrarea datelor personale se face în conformitate cu Politica noastră de Confidențialitate și cu Regulamentul GDPR."],
        privacyLink: true
      },
      {
        title: "10. Modificări ale termenilor",
        paragraphs: [
          "Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările intră în vigoare la publicarea pe site. Vă încurajăm să verificați periodic această pagină."
        ]
      },
      {
        title: "11. Legea aplicabilă",
        paragraphs: [
          "Acești termeni și condiții sunt guvernați de legile din România. Orice dispută va fi soluționată de instanțele competente din România."
        ]
      },
      {
        title: "12. Contact",
        paragraphs: ["Pentru orice întrebări legate de acești termeni și condiții:"],
        list: [
          { label: "Email:", value: "studiodezambete@gmail.com" },
          { label: "Telefon:", value: "0754 880 388" },
          { label: "Adresă:", value: "Strada Ion Creangă, bl. D5, sc. A, parter, ap. 1, Moinești" }
        ]
      }
    ]
  } : {
    sections: [
      {
        title: "1. General Information",
        paragraphs: [
          "This website is operated by Smile Studio, a dental clinic located in Moinești, Ion Creangă Street, bl. D5, sc. A, ground floor, ap. 1.",
          "By accessing and using this site, you agree to comply with these terms and conditions. If you do not agree with any of these terms, please do not use our website."
        ]
      },
      {
        title: "2. Our Services",
        paragraphs: ["Smile Studio offers professional dental services, including:"],
        bulletList: [
          { text: "Dental prophylaxis and consultations" },
          { text: "General and pediatric dentistry" },
          { text: "Odontotherapy and periodontology" },
          { text: "Endodontics (root canal treatments)" },
          { text: "Dental prosthetics and aesthetics" },
          { text: "Implantology and dental surgery" }
        ],
        footer: "All services are provided by licensed dentists, in accordance with Romanian legislation."
      },
      {
        title: "3. Appointments",
        paragraphs: ["Appointments can be made through:"],
        bulletList: [
          { text: "Phone: 0754 880 388 or 0751 522 355" },
          { text: "The contact form on the website" },
          { text: "Email: studiodezambete@gmail.com" }
        ],
        footer: "Appointment confirmation: You will receive a confirmation of your appointment by phone or email. The appointment is considered firm only after confirmation."
      },
      {
        title: "4. Cancellations and Rescheduling",
        paragraphs: [
          "Please notify us at least 24 hours in advance if you cannot honor an appointment. This allows us to offer the slot to another patient who needs care.",
          "For cancellations or rescheduling, you can contact us by phone at 0754 880 388."
        ]
      },
      {
        title: "5. Prices and Payments",
        paragraphs: [
          "Service prices are communicated before starting treatment. At your first consultation, you will receive a detailed treatment plan with associated costs.",
          "Accepted payment methods:"
        ],
        bulletList: [
          { text: "Cash" },
          { text: "Bank card" }
        ],
        footer: "For complex treatments, installment payment options may be available. Discuss with our team for details."
      },
      {
        title: "6. Website Content",
        paragraphs: [
          "The information presented on this site is for general informational purposes and does not constitute medical advice. For diagnosis and treatment, a consultation at the clinic is required.",
          "We strive to keep the information updated and accurate, but we do not guarantee completeness or accuracy at any time."
        ]
      },
      {
        title: "7. Intellectual Property",
        paragraphs: [
          "All materials on this site (texts, images, logo, design) are the property of Smile Studio or are used with permission. Copying, reproducing, or distributing these materials without our written consent is prohibited."
        ]
      },
      {
        title: "8. Limitation of Liability",
        paragraphs: ["Smile Studio is not responsible for:"],
        bulletList: [
          { text: "Decisions made based on website information without medical consultation" },
          { text: "Temporary interruptions in website operation" },
          { text: "Links to external websites" }
        ]
      },
      {
        title: "9. Data Privacy",
        paragraphs: ["Personal data processing is done in accordance with our Privacy Policy and the GDPR Regulation."],
        privacyLink: true
      },
      {
        title: "10. Changes to Terms",
        paragraphs: [
          "We reserve the right to modify these terms and conditions at any time. Changes take effect upon publication on the site. We encourage you to periodically check this page."
        ]
      },
      {
        title: "11. Applicable Law",
        paragraphs: [
          "These terms and conditions are governed by the laws of Romania. Any dispute will be resolved by the competent courts in Romania."
        ]
      },
      {
        title: "12. Contact",
        paragraphs: ["For any questions regarding these terms and conditions:"],
        list: [
          { label: "Email:", value: "studiodezambete@gmail.com" },
          { label: "Phone:", value: "0754 880 388" },
          { label: "Address:", value: "Ion Creangă Street, bl. D5, sc. A, ground floor, ap. 1, Moinești, Romania" }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-mint-light py-16 sm:py-20">
        <div className="w-[90%] max-w-4xl mx-auto">
          <Link
            href={`/${locale}`}
            className="text-mint hover:text-mint-dark text-sm font-medium mb-4 inline-block"
          >
            &larr; {t("backToHome")}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-dark">
            {tTerms("title")} <span className="font-semibold">{tTerms("titleHighlight")}</span>
          </h1>
          <p className="text-gray-500 mt-4">{t("lastUpdated")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-[90%] max-w-4xl mx-auto py-12 sm:py-16">
        <div className="prose prose-lg max-w-none text-gray-600 text-justify">
          {content.sections.map((section, idx) => (
            <section key={idx} className={idx < content.sections.length - 1 ? "mb-10" : ""}>
              <h2 className="text-xl font-semibold text-dark mb-4">{section.title}</h2>
              {section.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="mb-4 leading-relaxed">
                  {p}
                  {section.privacyLink && pIdx === (section.paragraphs?.length ?? 0) - 1 && (
                    <>
                      {" "}
                      <Link href={`/${locale}/privacy`} className="text-mint hover:text-mint-dark">
                        {locale === "ro" ? "Politica de Confidențialitate" : "Privacy Policy"}
                      </Link>
                    </>
                  )}
                </p>
              ))}
              {section.list && (
                <ul className="list-none space-y-2 ml-0">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx}><strong>{item.label}</strong> {item.value}</li>
                  ))}
                </ul>
              )}
              {section.bulletList && (
                <ul className="list-disc ml-6 space-y-2">
                  {section.bulletList.map((item, bIdx) => (
                    <li key={bIdx}>
                      {item.bold && <strong>{item.bold}</strong>} {item.text}
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="mt-4 leading-relaxed">{section.footer}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
