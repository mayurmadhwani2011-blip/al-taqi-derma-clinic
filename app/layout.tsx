import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Tajawal } from "next/font/google";
import "./globals.css";

const titleFont = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const arabicFont = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Al Taqi Poly Clinic | Luxury Dermatology Kuwait",
  description:
    "Advanced dermatology and aesthetic care in Kuwait. Premium consultations, laser treatments, Botox, fillers, skin rejuvenation, and digital-first appointment booking.",
  keywords: [
    "Dermatology Kuwait",
    "Aesthetic clinic Kuwait",
    "Laser treatment Kuwait",
    "Botox fillers Kuwait",
    "Luxury dermatology",
    "Al Taqi Poly Clinic",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/?lang=ar",
    },
  },
  openGraph: {
    title: "Al Taqi Poly Clinic | Luxury Dermatology Kuwait",
    description:
      "World-class dermatology and aesthetic care in Kuwait with premium medical experience.",
    type: "website",
    locale: "en_US",
    siteName: "Al Taqi Poly Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Taqi Poly Clinic | Luxury Dermatology Kuwait",
    description:
      "Advanced dermatology, laser, and aesthetic care with premium concierge experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${titleFont.variable} ${bodyFont.variable} ${arabicFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
