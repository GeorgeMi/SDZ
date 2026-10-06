import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Images renamed for SEO; permanent redirects keep old URLs (e.g. indexed by Google Images) working.
const renamedImages: Record<string, string> = {
  "/about_us.webp": "/interior-cabinet-stomatologic-studio-de-zambete.webp",
  "/cabinet_1.jpg": "/intrare-cabinet-studio-de-zambete.jpg",
  "/cabinet_2.jpg": "/zona-asteptare-studio-de-zambete.jpg",
  "/cabinet_3.jpg": "/receptie-studio-de-zambete.jpg",
  "/cabinet_4.png": "/unit-dentar-monitor-studio-de-zambete.png",
  "/cabinet_5.png": "/sala-tratament-studio-de-zambete.png",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(renamedImages).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
