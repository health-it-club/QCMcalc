import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QCMcalc By Health IT",
  description: "QCMCalc By Health IT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="0DajqRD3HIjUAEl9b-OTjxvu_QLQij9vMY7sxwKTVto"
        />
        <link
          rel="icon"
          type="image/png"
          href="public\favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="public\favicon-16x16.png"
          sizes="16x16"
        />
      </head>
      <body
        className={`${interSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
