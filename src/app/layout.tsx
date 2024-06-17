import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suivi Migraines",
  description: "Suivez vos migraines ainsi que l'environnement et les médicaments pris. Imprimez le calendrier des migraines",
  authors: [{ name: "ESHome33", url: "https://github.com/esHome33" }],
  creator: "ESHome33 & NextJS 14",
  keywords: ["migraines", "calendrier migraines", "suivi migraines", "calendrier de suivi des migraines"],
  robots: { index: true, follow: true },
  category: "utilitaire",
  openGraph: {
    title: "Suivi des migraines - calendrier",
    description: "Un outil simple pour suivre la survenue de migraines, le traitement et le niveau de douleur. Export des données en CSV. Aucune donnée sur le réseau.",
    locale: "FR-fr",
    images: "/opengraph-image.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  );
}
