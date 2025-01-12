import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baddy Buddy: Advanced Badminton Analytics",
  description: "Analyze your badminton games to unlock new insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Chatbot Trigger */}
        <Link
          href="/chat"
          passHref
          className="fixed bottom-5 right-4 w-24 h-24 object-contain transition duration-300 ease-in-out animate-wiggle"
        >
          <Image
            src="/birdie-baddie.png"
            alt="Decorative Graphic"
            className=""
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </body>
    </html>
  );
}
