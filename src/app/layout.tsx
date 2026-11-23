import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAP Onboarding | Deinsa Global",
  description: "Sistema de Onboarding y Capacitación Técnica del Leadership Acceleration Program",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Se cambia el idioma a español (RNF-17)
    <html lang="es" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950">
        {children}
      </body>
    </html>
  );
}