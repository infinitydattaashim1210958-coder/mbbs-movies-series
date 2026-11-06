import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoBengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-bangla" });

export const metadata: Metadata = {
  title: "MBBS | Bachelor of Movies, Bachelor of Series",
  description: "Every Story Has a Diagnosis. Every Movie Has a Lesson. Medical learning through cinema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoBengali.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
