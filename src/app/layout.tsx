import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BillPlz Analytics",
  description: "BillPlz Analytics Dashboard",
  icons: {
    icon: "/favicon.svg", // or "/favicon.ico"
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        className={`${inter.variable} font-sans antialiased overflow-x-clip`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
