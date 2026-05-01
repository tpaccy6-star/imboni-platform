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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://imboniapplicationhub.vercel.app'),
  title: "Imboni Application Hub | Your Gateway to Global Scholarships",
  description: "Unlocking global opportunities for African scholars. Access scholarships, jobs, and professional writing services.",
  keywords: ["Scholarships", "African Students", "Study Abroad", "Imboni Application Hub", "Rwanda Scholarships", "CV Writing Services", "Visa Consulting", "John TUYISHIME", "TUYIRINGIRE Pacifique"],
  authors: [{ name: "Imboni Hub Team" }],
  openGraph: {
    title: "Imboni Application Hub",
    description: "Unlocking global opportunities for African scholars.",
    url: "/",
    siteName: "Imboni Hub",
    images: [{ url: "/logo.png", width: 800, height: 600 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imboni Application Hub",
    description: "Your Gateway to Global Scholarships and Professional Success.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-white text-[#0A2647]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Imboni Application Hub",
              "alternateName": "Imboni Hub",
              "url": "https://imboniapplicationhub.vercel.app",
              "logo": "https://imboniapplicationhub.vercel.app/logo.png",
              "founder": [
                {
                  "@type": "Person",
                  "name": "John TUYISHIME",
                  "jobTitle": "CEO",
                  "sameAs": ["https://x.com/TuyishimeJohnwa"]
                }
              ],
              "employee": [
                {
                  "@type": "Person",
                  "name": "TUYIRINGIRE Pacifique",
                  "jobTitle": "Lead Developer",
                  "sameAs": ["https://x.com/Tuyipaccy"]
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+250789211992",
                "contactType": "customer service",
                "email": "imboniapplyhub@gmail.com"
              }
            })
          }}
        />
        {children}
        <WhatsAppButton />
        <DeveloperNotice />
      </body>
    </html>
  );
}
