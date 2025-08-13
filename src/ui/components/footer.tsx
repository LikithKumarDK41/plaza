'use client';

import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SEO_CONFIG } from '~/app';
import { cn } from '~/lib/cn';
import { Button } from '~/ui/primitives/button';
import { Skeleton } from '~/ui/primitives/skeleton';

export function Footer({ className }: { className?: string }) {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR-safe skeleton (prevents text drift on hydration)
    return (
      <footer className={cn('border-t bg-background', className)}>
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link className="flex items-center gap-2" href="/">
                {mounted ? (
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                    {SEO_CONFIG.name}
                  </span>
                ) : (
                  <div className="h-6 w-36 rounded bg-muted" />
                )}
              </Link>
              <Skeleton className="h-4 w-64" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="mb-4 h-4 w-24" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-36" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Skeleton className="h-4 w-72" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link className="flex items-center gap-2" href="/">
              <span
                className={`
                  bg-gradient-to-r from-primary to-primary/70 bg-clip-text
                  text-xl font-bold tracking-tight text-transparent
                `}
              >
                {SEO_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <Button className="h-8 w-8 rounded-full" size="icon" variant="ghost" aria-label={t('footer.social.facebook')}>
                <Facebook className="h-4 w-4" />
                <span className="sr-only">{t('footer.social.facebook')}</span>
              </Button>
              <Button className="h-8 w-8 rounded-full" size="icon" variant="ghost" aria-label={t('footer.social.twitter')}>
                <Twitter className="h-4 w-4" />
                <span className="sr-only">{t('footer.social.twitter')}</span>
              </Button>
              <Button className="h-8 w-8 rounded-full" size="icon" variant="ghost" aria-label={t('footer.social.instagram')}>
                <Instagram className="h-4 w-4" />
                <span className="sr-only">{t('footer.social.instagram')}</span>
              </Button>
              <Button className="h-8 w-8 rounded-full" size="icon" variant="ghost" aria-label={t('footer.social.github')}>
                <Github className="h-4 w-4" />
                <span className="sr-only">{t('footer.social.github')}</span>
              </Button>
              <Button className="h-8 w-8 rounded-full" size="icon" variant="ghost" aria-label={t('footer.social.linkedin')}>
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">{t('footer.social.linkedin')}</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.cols.shop')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/products">
                  {t('footer.links.allGiftCards')}
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/products?category=audio">
                  {t('footer.links.birthday')}
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/products?category=wearables">
                  {t('footer.links.anniversary')}
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/products?category=smartphones">
                  {t('footer.links.festivals')}
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/products?category=laptops">
                  {t('footer.links.thankYou')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.cols.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-muted-foreground hover:text-foreground" href="/about">{t('footer.links.aboutUs')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/careers">{t('footer.links.careers')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/blog">{t('footer.links.blog')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/press">{t('footer.links.media')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/contact">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.cols.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-muted-foreground hover:text-foreground" href="/help">{t('footer.links.helpCenter')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/shipping">{t('footer.links.deliveryRefund')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/warranty">{t('footer.links.cardCustomization')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/privacy">{t('footer.links.privacyPolicy')}</Link></li>
              <li><Link className="text-muted-foreground hover:text-foreground" href="/terms">{t('footer.links.termsOfUse')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright', {
                year: new Date().getFullYear(),
                name: SEO_CONFIG.name,
              })}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link className="hover:text-foreground" href="/privacy">{t('footer.bottom.privacy')}</Link>
              <Link className="hover:text-foreground" href="/terms">{t('footer.bottom.terms')}</Link>
              <Link className="hover:text-foreground" href="/cookies">{t('footer.bottom.cookies')}</Link>
              <Link className="hover:text-foreground" href="/sitemap">{t('footer.bottom.sitemap')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
