import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D3V.LAB - Where Innovation Meets Creation",
  description:
    "Pioneering the future through cutting-edge software and hardware solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
