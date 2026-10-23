import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const description =
  "Muhammad Daniyal is an aspiring AI Engineer building practical AI applications with LLMs, RAG, computer vision and full-stack development. Based in Lahore, Pakistan.";

export const metadata: Metadata = {
  title: "Muhammad Daniyal | AI Engineer & Computer Vision",
  description,
  openGraph: {
    title: "Muhammad Daniyal | AI Engineer & Computer Vision",
    description,
    type: "website",
  },
  twitter: { card: "summary", title: "Muhammad Daniyal | AI Engineer & Computer Vision", description },
};

export const viewport: Viewport = { themeColor: "#090B0E" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
