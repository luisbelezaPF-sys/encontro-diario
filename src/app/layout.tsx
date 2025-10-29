import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encontro Diário com Deus",
  description: "Sua jornada espiritual diária com orações, reflexões e versículos bíblicos",
  manifest: "/manifest.json",
  themeColor: "#87CEEB",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Encontro Diário" />
      </head>
      <body className={`${inter.variable} font-inter antialiased bg-gradient-to-br from-sky-50 via-blue-50 to-amber-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}