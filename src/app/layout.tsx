import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const inter = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suivi Migraines",
  description: "Suivez vos migraines ainsi que l'environnement et les médicaments pris. Imprimez le calendrier des migraines",
  authors: [{ name: "ESHome33", url: "https://github.com/esHome33" }],
  creator: "ESHome33 & NextJS",
  keywords: ["migraines", "calendrier migraines", "suivi migraines", "calendrier de suivi des migraines"],
  robots: { index: true, follow: true },
  category: "utilitaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
