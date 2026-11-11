import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const titre = Fraunces({
  subsets: ["latin"],
  variable: "--font-titre",
  weight: ["600", "800"],
});
const texte = DM_Sans({ subsets: ["latin"], variable: "--font-texte" });

export const metadata: Metadata = {
  title: "Fantômes : retrouve les abonnements que tu paies sans t’en servir",
  description:
    "Dépose ton relevé bancaire, vois en 1 minute tous tes prélèvements oubliés et résilie-les. Gratuit pour commencer.",
  openGraph: {
    title: "Fantômes : retrouve les abonnements que tu paies sans t’en servir",
    description:
      "Dépose ton relevé, vois tes prélèvements oubliés, résilie-les.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body>{children}</body>
    </html>
  );
}
