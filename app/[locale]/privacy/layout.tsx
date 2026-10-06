import { legalPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return legalPageMetadata(params, "privacy");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
