import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  title: "PandaPaths - Engineering Digital Paths to the Future",
  description: "PandaPaths is a full-stack IT solutions company delivering scalable software, AI systems, and cloud-ready digital products.",
  keywords: ["IT Services", "Software Development", "AI Solutions", "Cloud Computing", "Web Development", "Mobile Apps"],
  authors: [{ name: "PandaPaths" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "PandaPaths - Engineering Digital Paths to the Future",
    description: "Full-stack IT solutions company delivering scalable software, AI systems, and cloud-ready digital products.",
    type: "website",
  },
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
        </ThemeProvider>
      </body>
    </html>
  );
}
