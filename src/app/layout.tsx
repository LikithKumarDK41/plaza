import type { Metadata } from "next";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";

import { SEO_CONFIG } from "~/app";
import { CartProvider } from "~/lib/hooks/use-cart";
import "~/css/globals.css";
import { Footer } from "~/ui/components/footer";
import { Header } from "~/ui/components/header/header";
import { ThemeProvider } from "~/ui/components/theme-provider";
import { Toaster } from "~/ui/primitives/sonner";
import { I18nProvider } from "~/ui/components/i18n-provider";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  description: SEO_CONFIG.description,
  title: SEO_CONFIG.fullName,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}
          min-h-screen bg-gradient-to-br from-white to-slate-100
          text-neutral-900 antialiased selection:bg-primary/80
          dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-100`}
      >
        {/* Client-only providers/components are fine inside a Server Layout */}
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableSystem>
            <CartProvider>
              <Header showAuth={true} />
              <main className="flex flex-col min-h-screen">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
                  {children}
                </div>
              </main>
              <Footer />
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </I18nProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
