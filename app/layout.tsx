import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queerMapFont = localFont({
  src: "./fonts/FaytePixelTest-Soft.otf",
  weight: "400",
  style: "normal",
  variable: "--font-queer-map",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abortion Is Normal",
  description: "Mapping abortion stories everywhere",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${queerMapFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
