import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout"; // Import the layout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonic Seeker - Audio Tool",
  description: "An all-in-one audio tool for analysis and processing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {/* Wrap children with MainLayout */}
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
