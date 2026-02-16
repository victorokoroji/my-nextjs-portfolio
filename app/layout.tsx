import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victor Okoroji - Frontend Engineer | React, Next.js, TypeScript",
  description:
    "Frontend Engineer with 4+ years building scalable SaaS and enterprise applications. Specialized in React, Next.js, TypeScript.",
  metadataBase: new URL("https://victorokoroji.vercel.app"),
  alternates: {
    canonical: "/",
  },
  other: {
        'application/ld+json': JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Victor Ebube Okoroji",
          "jobTitle": "Frontend Engineer",
          "description": "Frontend Engineer with 4+ years building scalable SaaS and enterprise applications. Specialized in React, Next.js, TypeScript.",
          "url": "https://victorokoroji.vercel.app",
          "sameAs": [
            "https://www.linkedin.com/in/victor-ebube-okoroji-9b1a4b1b3/",
            "https://github.com/victorokoroji",
            "https://twitter.com/victorokoroji",
            "https://www.instagram.com/victorokoroji/",
            "https://www.facebook.com/victor.okoroji.589"
          ],
          'applicationCategory': 'Web Application',
          'keywords': 'Frontend Engineer, React, Next.js, TypeScript, SaaS, Enterprise Applications',
          image: {
        '@type': 'ImageObject',
        url: '/profile-picture.jpg',
        width: '528',
        height: '350',
      },
      screenshot: '/profile-picture.jpg',
      author: {
        '@type': 'Person',
        name: 'Victor Ebube Okoroji',
      },
        })

  },
  openGraph: {
    title: "Victor Okoroji - Frontend Engineer",
    description:
      "Frontend Engineer with 4+ years building scalable SaaS and enterprise applications. Specialized in React, Next.js, TypeScript.",
    url: "https://victorokoroji.vercel.app",
    siteName: "Victor Okoroji Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/profile-picture.jpg',
        width: 800,
        height: 800,
        alt: 'Victor Okoroji - Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Okoroji - Frontend Engineer",
    description:
      "Frontend Engineer with 4+ years building scalable SaaS and enterprise applications.",
  images: [
      {
        url: '/profile-picture.jpg',
        width: 800,
        height: 800,
        alt: 'Victor Okoroji - Frontend Engineer',
      },
    ],
    },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
