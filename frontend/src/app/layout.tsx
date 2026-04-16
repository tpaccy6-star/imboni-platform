import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import DeveloperNotice from "@/components/DeveloperNotice";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imboni Application Hub | Your Gateway to Global Scholarships",
  description: "Unlocking global opportunities for African scholars. Access scholarships, jobs, and professional writing services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-white text-[#0A2647]">
        {children}
        <WhatsAppButton />
        <DeveloperNotice />
      </body>
    </html>
  );
}
