import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Lusk Technologies | Open Source Projects & Developer Tools",
    template: "%s | Lusk Technologies",
  },
  description: "Building the future of tech through open source. Docker containers, developer tools, and infrastructure automation by Lusk Technologies, Inc.",
  keywords: ["open source", "docker", "developer tools", "infrastructure", "automation", "Toronto", "Lusk Technologies"],
  authors: [{ name: "Lusk Technologies, Inc.", url: "https://lusk.app" }],
  creator: "Lusk Technologies, Inc.",
  publisher: "Lusk Technologies, Inc.",
  metadataBase: new URL("https://lusk.app"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Lusk Technologies | Open Source Projects",
    description: "Building the future of tech through open source. Docker containers, developer tools, and infrastructure automation.",
    url: "https://lusk.app",
    siteName: "Lusk Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lusk Technologies - Building the Future of Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lusk Technologies | Open Source Projects",
    description: "Building the future of tech through open source.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-white`}>
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
