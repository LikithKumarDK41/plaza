"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Menu, X, Languages, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SEO_CONFIG } from "~/app";
import { cn } from "~/lib/cn";
import { loadLocale } from "~/lib/i18n.client";
import { Button } from "~/ui/primitives/button";
import { Skeleton } from "~/ui/primitives/skeleton";

/** Client-only widgets (no SSR; stable placeholders on server) */
const Cart = dynamic(() => import("~/ui/components/cart").then(m => m.Cart), {
  ssr: false,
  loading: () => <Skeleton className="h-9 w-9 rounded-full" />
});
const NotificationsWidget = dynamic(
  () => import("../notifications/notifications-widget").then(m => m.NotificationsWidget),
  { ssr: false, loading: () => <Skeleton className="h-9 w-9 rounded-full" /> }
);
const HeaderUserDropdown = dynamic(
  () => import("./header-user").then(m => m.HeaderUserDropdown),
  { ssr: false, loading: () => <Skeleton className="h-10 w-32" /> }
);
const ThemeToggle = dynamic(
  () => import("../theme-toggle").then(m => m.ThemeToggle),
  { ssr: false, loading: () => <Skeleton className="h-9 w-9 rounded-full" /> }
);

export function Header() {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** Language toggle (no SSR reads) */
  const [lang, setLang] = useState<"ja" | "en">("ja");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as
      | "ja" | "en" | null;
    if (saved === "ja" || saved === "en") setLang(saved);
  }, []);
  const nextLang = lang === "ja" ? "en" : "ja";
  async function handleToggleLang() {
    const next = nextLang;
    setLang(next);
    if (typeof window !== "undefined") localStorage.setItem("lang", next);
    await loadLocale(next);
  }

  /** Translate nav labels; render skeleton until mounted to avoid SSR drift */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  type NavItem = { href: string; key: string };
  const navigation: ReadonlyArray<NavItem> = useMemo(
    () => [
      { href: "/", key: "nav.home" },
      { href: "/products", key: "nav.products" },
      // uncomment if you add dashboard routes later:
      // { href: "/dashboard/stats", key: "nav.stats" },
      // { href: "/dashboard/profile", key: "nav.profile" },
      // { href: "/dashboard/settings", key: "nav.settings" },
      // { href: "/dashboard/uploads", key: "nav.uploads" },
      // { href: "/admin/summary", key: "nav.admin" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand + Nav */}
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-2" href="/">
              <span
                className={cn(
                  "text-xl font-bold",
                  "bg-gradient-to-r from-primary to-primary/70 bg-clip-text tracking-tight text-transparent"
                )}
              >
                {SEO_CONFIG.name}
              </span>
            </Link>

            <nav className="hidden md:flex">
              <ul className="flex items-center gap-6">
                {!mounted
                  ? // SSR-safe placeholders
                  navigation.map((_, i) => (
                    <li key={`s-${i}`}><Skeleton className="h-6 w-20" /></li>
                  ))
                  : navigation.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname?.startsWith(item.href));
                    return (
                      <li key={item.key}>
                        <Link
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            isActive ? "font-semibold text-primary" : "text-muted-foreground"
                          )}
                          href={item.href}
                        >
                          {t(item.key)}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>

          {/* Actions (always visible) */}
          <div className="flex items-center gap-4">
            <Cart />
            <NotificationsWidget />
            <ThemeToggle />

            {/* Icon-only language toggle */}
            <Button
              size="icon"
              variant="ghost"
              aria-label="Switch language"
              title="Switch language"
              onClick={handleToggleLang}
            >
              {lang === "ja" ? <Globe className="h-5 w-5" /> : <Languages className="h-5 w-5" />}
            </Button>

            {/* User dropdown (placeholder data; always visible) */}
            <HeaderUserDropdown
              isDashboard={false}
              userEmail={"guest@example.com"}
              userImage={undefined}
              userName={"Guest"}
            />

            {/* Mobile menu button */}
            <Button
              className="md:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              size="icon"
              variant="ghost"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 rotate-90 transition-transform" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 border-b px-4 py-3">
            {!mounted
              ? navigation.map((_, i) => (
                <div className="py-2" key={`ms-${i}`}>
                  <Skeleton className="h-6 w-32" />
                </div>
              ))
              : navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50 hover:text-primary"
                    )}
                    href={item.href}
                    key={item.key}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
          </div>

          <div className="flex items-center justify-end px-4 py-3 border-b">
            <Button size="icon" variant="ghost" onClick={handleToggleLang}>
              {lang === "ja" ? <Globe className="h-5 w-5" /> : <Languages className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
