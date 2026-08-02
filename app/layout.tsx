import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FluidBackground from "@/components/FluidBackground";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { OG_IMAGE } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// Space Grotesk carries the headings: technical and distinctive without
// the generic-template feel of a geometric sans.
const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-space',
  display: 'swap',
});

// A real monospace for prices, metrics and code labels — the previous
// setup mapped `font-mono` to a proportional sans, so numbers jittered.
const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://pandapath.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Development Agency in Bangalore — WhatsApp Bots & RAG Systems | PandaPath",
    template: "%s · PandaPath",
  },
  description:
    "We design and ship WhatsApp AI bots, RAG knowledge systems, and full-stack AI products for Indian startups. Fixed pricing from ₹25,000, live in 2–4 weeks, straight to the developer who builds it.",
  keywords: [
    "AI agency Bangalore",
    "WhatsApp chatbot India",
    "RAG system India",
    "AI development India",
    "software agency Bangalore",
    "AI product studio India",
  ],
  authors: [{ name: "PandaPath", url: SITE_URL }],
  creator: "PandaPath",
  publisher: "PandaPath",
  alternates: { canonical: '/' },
  openGraph: {
    title: "PandaPath — AI Products for Indian Startups, Shipped in Weeks",
    description:
      "WhatsApp AI bots, RAG systems, and full-stack AI builds. Fixed pricing from ₹25,000, live in 2–4 weeks. Bangalore-based, founder-direct.",
    type: "website",
    locale: 'en_IN',
    siteName: 'PandaPath',
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PandaPath — AI Products for Indian Startups",
    description: "WhatsApp AI bots, RAG systems, and full-stack AI builds — live in 2–4 weeks.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    google: '8VkyNu2gGKWF_k6wnFLblT0JTJAhGJVgvtO8oPgxlt8',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#05070d' },
  ],
};

// Applies the stored theme before first paint. Without this the page
// renders in the default theme and then snaps — a visible flash on
// every load, plus a layout-stable but jarring colour swap.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t='light'}document.documentElement.classList.toggle('light',t==='light')}catch(e){document.documentElement.classList.add('light')}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Must stay the FIRST canvas in the document — the simulation binds
              to getElementsByTagName('canvas')[0]. Keep above the hero's
              Three.js canvas in source order. */}
          <FluidBackground />

          {/* Skip link — first tab stop for keyboard users (WCAG 2.4.1) */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-white focus:font-semibold"
          >
            Skip to main content
          </a>
          <Navigation />
          {/* z-10 lifts page content above the fixed fluid layer (z-0) while
              leaving section backgrounds transparent, so the swirls show
              through the gaps between cards. */}
          <main id="main" className="relative z-10 min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
