import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lambdata - Dashboard Administrateur",
  description: "Dashboard Administrateur Lambdata - Pilotage des campagnes de collecte, modération des contributions et gestion des paiements.",
  keywords: ["Lambdata", "dashboard", "collecte", "contributions", "paiements", "administration"],
  authors: [{ name: "Lambdata" }],
  openGraph: {
    title: "Lambdata - Dashboard Administrateur",
    description: "Dashboard Administrateur Lambdata - Pilotage des campagnes de collecte, modération des contributions et gestion des paiements.",
    siteName: "Lambdata",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lambdata - Dashboard Administrateur",
    description: "Dashboard Administrateur Lambdata - Pilotage des campagnes de collecte, modération des contributions et gestion des paiements.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
