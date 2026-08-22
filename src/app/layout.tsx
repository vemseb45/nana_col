import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Nana Home - Nueva Colección Tropical",
  description: "Moda tropical premium para espíritus libres. Diseñado con amor por el océano.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-body transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}