import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import UserProvider from "@/components/providers/UserProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CashNado - Budget Tracker",
  description: "Track your expenses and manage your budget with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
