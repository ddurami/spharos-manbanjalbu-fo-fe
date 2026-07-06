import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "스타벅스 | 만반잘부",
  description: "스타벅스 코리아 공식 온라인 스토어",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
