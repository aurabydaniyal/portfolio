import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

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

export const viewport: Viewport = { themeColor: "#050505" };

/**
 * Runs before first paint so the saved theme is applied with no flash. Dark is the default;
 * the animated theme toggler stores "light" | "dark" under the `theme` key.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=document.documentElement;if(t==="light"){d.classList.remove("dark")}else{d.classList.add("dark")}d.dataset.intro="active"}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrains.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
