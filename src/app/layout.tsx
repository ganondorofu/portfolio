import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "yoneyone Portfolio",
  description: "yoneyone's personal portfolio - Full-stack developer with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#ffffff' }}>
      <body 
        className={`${inter.className} antialiased`}
        style={{ 
          fontFamily: 'Inter, Arial, sans-serif !important', 
          color: '#ffffff !important',
          backgroundColor: '#000000'
        }}
      >
        {children}
      </body>
    </html>
  );
}
