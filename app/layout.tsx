import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import ThemeProvider from "@/app/components/theme-provider";
import LocaleProvider from "@/app/components/locale-provider";
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
  title: "DevFactors | Software Engineering & Technology Consulting",
  description:
    "DevFactors delivers cutting-edge software engineering, cloud infrastructure, and AI solutions. Partner with us to accelerate your digital transformation.",
  keywords: [
    "software engineering",
    "web development",
    "cloud infrastructure",
    "AI solutions",
    "technology consulting",
    "DevFactors",
  ],
  openGraph: {
    title: "DevFactors | Software Engineering & Technology Consulting",
    description:
      "Professional software engineering and technology consulting services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent FOUC - apply dark class before React hydrates */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var theme = localStorage.getItem("theme");
                if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark");
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <LocaleProvider><ThemeProvider>{children}</ThemeProvider></LocaleProvider>
      </body>
    </html>
  );
}
