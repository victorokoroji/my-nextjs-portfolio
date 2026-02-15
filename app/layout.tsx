import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
  metadataBase: new URL("https://victorokoroji.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Victor Okoroji - Frontend Engineer",
    description:
      "Building scalable, high-performance web applications for enterprise and SaaS clients.",
    url: "https://victorokoroji.dev",
    siteName: "Victor Okoroji Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Okoroji - Frontend Engineer",
    description:
      "Frontend Engineer with 4+ years building scalable SaaS and enterprise applications.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
