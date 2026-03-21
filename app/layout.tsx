import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap', // Prevents render blocking - shows fallback font until custom font loads
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap', // Prevents render blocking
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space',
  display: 'swap', // Prevents render blocking
});

export const metadata: Metadata = {
  title: "PandaPath — AI Products for Indian Startups",
  description: "We build WhatsApp AI bots, RAG systems, and full-stack AI products for Indian startups — shipped in 2–4 weeks. Based in Bangalore.",
  keywords: ["AI agency Bangalore", "WhatsApp chatbot India", "RAG system India", "AI startup India", "software agency Bangalore", "AI development India"],
  authors: [{ name: "PandaPath" }],
  openGraph: {
    title: "PandaPath — AI Products for Indian Startups",
    description: "WhatsApp bots, RAG systems, and full-stack AI builds — shipped in 2–4 weeks. Trusted by founders in Bangalore, Mumbai, and Delhi.",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
