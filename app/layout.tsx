import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PureSofa Cleaning – Professional Upholstery & Carpet Cleaning",
  description:
    "Professional upholstery and carpet cleaning chemical supplier in Malta. Shop Global Clean products including presprays, extraction liquids, stain removers, and leather care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
