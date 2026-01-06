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
};

type Content = {
  sections: Section[];
};

export default function Privacy() {
  const t = useTranslations("common");
  const tPrivacy = useTranslations("privacy");
  const locale = useLocale();

  const content: Content = locale === "ro" ? {
    sections: [
      {
        title: "1. Introducere",
        paragraphs: [
          "Studio de Zâmbete, cu sediul în Moinești, Strada Ion Creangă, bl. D5, sc. A, parter, ap. 1, respectă confidențialitatea datelor dumneavoastră personale și se angajează să protejeze informațiile pe care ni le furnizați.",
          "Această politică de confidențialitate explică modul în care colectăm, utilizăm și protejăm datele dumneavoastră personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) - Regulamentul (UE) 2016/679."
        ]
      },
      {
        title: "2. Operatorul de date",
        paragraphs: ["Operatorul de date personale este Studio de Zâmbete:"],
        list: [
          { label: "Adresă:", value: "Strada Ion Creangă, bl. D5, sc. A, parter, ap. 1, Moinești" },
          { label: "Telefon:", value: "0754 880 388 / 0751 522 355" },
          { label: "Email:", value: "studiodezambete@gmail.com" }
        ]
      },
      {
        title: "3. Datele personale colectate",
        paragraphs: ["Colectăm următoarele categorii de date personale:"],
        bulletList: [
          { bold: "Date de identificare:", text: "nume, prenume" },
          { bold: "Date de contact:", text: "număr de telefon, adresă de email" },
          { bold: "Date medicale:", text: "istoric medical dentar, tratamente anterioare, alergii (doar în cadrul consultațiilor)" }
        ]
      },
      {
        title: "4. Scopul prelucrării datelor",
        paragraphs: ["Datele dumneavoastră sunt prelucrate în următoarele scopuri:"],
        bulletList: [
          { text: "Programarea și gestionarea consultațiilor stomatologice" },
          { text: "Furnizarea serviciilor medicale stomatologice" },
          { text: "Comunicarea cu pacienții (confirmări programări, reamintiri)" },
          { text: "Răspunsul la solicitările și întrebările dumneavoastră" },
          { text: "Îmbunătățirea serviciilor noastre" },
          { text: "Respectarea obligațiilor legale" }
        ]
      },
      {
        title: "5. Temeiul legal al prelucrării",
        paragraphs: ["Prelucrăm datele dumneavoastră pe baza următoarelor temeiuri legale:"],
        bulletList: [
          { bold: "Consimțământul:", text: "pentru trimiterea formularului de contact și comunicări de marketing" },
          { bold: "Executarea contractului:", text: "pentru furnizarea serviciilor medicale solicitate" },
          { bold: "Obligația legală:", text: "pentru păstrarea documentației medicale conform legislației în vigoare" },
          { bold: "Interesul legitim:", text: "pentru îmbunătățirea serviciilor și securitatea site-ului" }
        ]
      },
      {
        title: "6. Durata stocării datelor",
        paragraphs: ["Datele personale sunt stocate pentru perioade diferite, în funcție de natura lor:"],
        bulletList: [
          { bold: "Datele medicale:", text: "conform legislației în vigoare privind documentația medicală (minimum 10 ani)" },
          { bold: "Datele de contact din formulare:", text: "2 ani de la ultima interacțiune" }
        ]
      },
      {
        title: "7. Drepturile dumneavoastră",
        paragraphs: ["În conformitate cu GDPR, aveți următoarele drepturi:"],
        bulletList: [
          { bold: "Dreptul de acces:", text: "puteți solicita informații despre datele prelucrate" },
          { bold: "Dreptul la rectificare:", text: "puteți cere corectarea datelor inexacte" },
          { bold: "Dreptul la ștergere:", text: "puteți solicita ștergerea datelor (cu excepțiile legale)" },
          { bold: "Dreptul la restricționarea prelucrării:", text: "puteți limita modul de utilizare a datelor" },
          { bold: "Dreptul la portabilitatea datelor:", text: "puteți primi datele într-un format structurat" },
          { bold: "Dreptul de opoziție:", text: "puteți refuza prelucrarea în anumite circumstanțe" },
          { bold: "Dreptul de a depune plângere:", text: "la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)" }
        ],
        footer: "Pentru exercitarea acestor drepturi, ne puteți contacta la: studiodezambete@gmail.com"
      },
      {
        title: "8. Securitatea datelor",
        paragraphs: [
          "Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră personale împotriva accesului neautorizat, pierderii, distrugerii sau divulgării. Site-ul nostru utilizează conexiune securizată (HTTPS)."
        ]
      },
      {
        title: "9. Cookies și tracking",
        paragraphs: [
          "Respectăm confidențialitatea dumneavoastră. Site-ul nostru nu utilizează cookies de tracking, cookies analitice sau alte tehnologii de urmărire a comportamentului vizitatorilor. Nu colectăm date despre navigarea dumneavoastră și nu partajăm informații cu terțe părți în scopuri de analiză sau marketing.",
          "Singurele cookies care pot fi utilizate sunt cele strict necesare pentru funcționarea tehnică a site-ului (de exemplu, pentru menținerea sesiunii în formularul de contact), care nu necesită consimțământ conform legislației în vigoare."
        ]
      },
      {
        title: "10. Modificări ale politicii",
        paragraphs: [
          "Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Orice modificare va fi publicată pe această pagină cu data actualizării."
        ]
      },
      {
        title: "11. Contact",
        paragraphs: ["Pentru orice întrebări legate de această politică sau de prelucrarea datelor dumneavoastră personale, ne puteți contacta la:"],
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
        title: "1. Introduction",
        paragraphs: [
          "Smile Studio, located in Moinești, Ion Creangă Street, bl. D5, sc. A, ground floor, ap. 1, respects the confidentiality of your personal data and is committed to protecting the information you provide to us.",
          "This privacy policy explains how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) - Regulation (EU) 2016/679."
        ]
      },
      {
        title: "2. Data Controller",
        paragraphs: ["The personal data controller is Smile Studio:"],
        list: [
          { label: "Address:", value: "Ion Creangă Street, bl. D5, sc. A, ground floor, ap. 1, Moinești, Romania" },
          { label: "Phone:", value: "0754 880 388 / 0751 522 355" },
          { label: "Email:", value: "studiodezambete@gmail.com" }
        ]
      },
      {
        title: "3. Personal Data Collected",
        paragraphs: ["We collect the following categories of personal data:"],
        bulletList: [
          { bold: "Identification data:", text: "first name, last name" },
          { bold: "Contact data:", text: "phone number, email address" },
          { bold: "Medical data:", text: "dental medical history, previous treatments, allergies (only during consultations)" }
        ]
      },
      {
        title: "4. Purpose of Data Processing",
        paragraphs: ["Your data is processed for the following purposes:"],
        bulletList: [
          { text: "Scheduling and managing dental appointments" },
          { text: "Providing dental medical services" },
          { text: "Communication with patients (appointment confirmations, reminders)" },
          { text: "Responding to your requests and questions" },
          { text: "Improving our services" },
          { text: "Compliance with legal obligations" }
        ]
      },
      {
        title: "5. Legal Basis for Processing",
        paragraphs: ["We process your data based on the following legal grounds:"],
        bulletList: [
          { bold: "Consent:", text: "for submitting the contact form and marketing communications" },
          { bold: "Contract performance:", text: "for providing the requested medical services" },
          { bold: "Legal obligation:", text: "for maintaining medical documentation according to current legislation" },
          { bold: "Legitimate interest:", text: "for improving services and website security" }
        ]
      },
      {
        title: "6. Data Storage Duration",
        paragraphs: ["Personal data is stored for different periods, depending on its nature:"],
        bulletList: [
          { bold: "Medical data:", text: "according to current legislation regarding medical documentation (minimum 10 years)" },
          { bold: "Contact form data:", text: "2 years from the last interaction" }
        ]
      },
      {
        title: "7. Your Rights",
        paragraphs: ["In accordance with GDPR, you have the following rights:"],
        bulletList: [
          { bold: "Right of access:", text: "you can request information about processed data" },
          { bold: "Right to rectification:", text: "you can request correction of inaccurate data" },
          { bold: "Right to erasure:", text: "you can request deletion of data (with legal exceptions)" },
          { bold: "Right to restriction:", text: "you can limit how data is used" },
          { bold: "Right to data portability:", text: "you can receive data in a structured format" },
          { bold: "Right to object:", text: "you can refuse processing in certain circumstances" },
          { bold: "Right to lodge a complaint:", text: "with the National Supervisory Authority for Personal Data Processing (ANSPDCP)" }
        ],
        footer: "To exercise these rights, you can contact us at: studiodezambete@gmail.com"
      },
      {
        title: "8. Data Security",
        paragraphs: [
          "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, destruction, or disclosure. Our website uses a secure connection (HTTPS)."
        ]
      },
      {
        title: "9. Cookies and Tracking",
        paragraphs: [
          "We respect your privacy. Our website does not use tracking cookies, analytical cookies, or other technologies for monitoring visitor behavior. We do not collect data about your browsing activity and do not share information with third parties for analytics or marketing purposes.",
          "The only cookies that may be used are those strictly necessary for the technical operation of the website (for example, to maintain the session in the contact form), which do not require consent under current legislation."
        ]
      },
      {
        title: "10. Policy Changes",
        paragraphs: [
          "We reserve the right to update this privacy policy. Any changes will be published on this page with the update date."
        ]
      },
      {
        title: "11. Contact",
        paragraphs: ["For any questions regarding this policy or the processing of your personal data, you can contact us at:"],
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
            {tPrivacy("title")} <span className="font-semibold">{tPrivacy("titleHighlight")}</span>
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
                <p key={pIdx} className="mb-4 leading-relaxed">{p}</p>
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
