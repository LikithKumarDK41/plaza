'use client';

import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductCard } from '~/ui/components/product-card';
import { Button } from '~/ui/primitives/button';
import { Skeleton } from '~/ui/primitives/skeleton';

import {
  featuredGiftCardsHomepage,
  giftCardCategories,
} from './mocks';

export default function HomePage() {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ---------- SKELETON (SSR-safe, no dynamic text) ----------
  if (!mounted) {
    return (
      <main className="flex min-h-screen flex-col gap-y-16 bg-gradient-to-b from-muted/50 via-muted/25 to-background">
        {/* Hero skeleton */}
        <section className="relative overflow-hidden py-14 md:py-14">
          <div className="bg-grid-black/[0.02] absolute inset-0 bg-[length:20px_20px]" />
          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-3/4 sm:h-12" />
                  <Skeleton className="h-10 w-1/2 sm:h-12" />
                  <Skeleton className="h-5 w-[700px] max-w-full" />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Skeleton className="h-12 w-48" />
                  <Skeleton className="h-12 w-40" />
                </div>

                <div className="flex flex-wrap gap-5">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-60" />
                </div>
              </div>

              {/* SKELETON hero media */}
              <div
                className="
    relative mx-auto block   /* was: hidden lg:block */
    w-full max-w-md
    aspect-[4/3] sm:aspect-[3/2] lg:aspect-square
    overflow-hidden rounded-xl border shadow-lg
  "
              >
                <Skeleton className="absolute inset-0" />
              </div>

            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>

        {/* Categories skeleton */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <Skeleton className="h-8 w-64" />
              <div className="mt-2 h-1 w-12 rounded-full bg-primary/40" />
              <div className="mt-4">
                <Skeleton className="mx-auto h-5 w-80" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col space-y-4 overflow-hidden rounded-2xl border bg-card shadow transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <div className="relative z-20 -mt-6 p-4">
                    <Skeleton className="mb-2 h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured skeleton */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <Skeleton className="h-8 w-72" />
              <div className="mt-2 h-1 w-12 rounded-full bg-primary/40" />
              <div className="mt-4">
                <Skeleton className="mx-auto h-5 w-[28rem] max-w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card p-3 shadow-sm">
                  <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <Skeleton className="mb-2 h-5 w-40" />
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Skeleton className="h-12 w-56 rounded-md" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ---------- REAL PAGE (translated) ----------
  return (
    <>
      <main className="flex min-h-screen flex-col gap-y-16 bg-gradient-to-b from-muted/50 via-muted/25 to-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-14 md:py-14">
          <div className="bg-grid-black/[0.02] absolute inset-0 bg-[length:20px_20px]" />
          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1
                    className="
                      font-display text-3xl leading-tight font-bold
                      tracking-tight text-foreground sm:text-5xl md:text-5xl
                      lg:leading-[1.1]
                    "
                  >
                    {t('home.hero.titleLead')}
                    <span
                      className="
                        bg-gradient-to-r from-primary to-primary/70 bg-clip-text
                        text-transparent
                      "
                    >
                      {t('home.hero.titleEmphasis')}
                    </span>
                  </h1>
                  <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                    {t('home.hero.subtitle')}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/products">
                    <Button className="h-12 gap-1.5 px-8 transition-colors duration-200" size="lg">
                      {t('home.hero.ctaBrowse')} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button className="h-12 px-8 transition-colors duration-200" size="lg" variant="outline">
                      {t('home.hero.ctaHow')}
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Gift className="h-5 w-5 text-primary/70" />
                    <span>{t('home.hero.badgeInstant')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-5 w-5 text-primary/70" />
                    <span>{t('home.hero.badgeCustom')}</span>
                  </div>
                </div>
              </div>

              {/* REAL hero media */}
              <div
                className="
    relative mx-auto block   /* was: hidden lg:block */
    w-full                   /* was: w/full (typo) */
    max-w-md
    aspect-[4/3] sm:aspect-[3/2] lg:aspect-square
    overflow-hidden rounded-xl border shadow-lg
  "
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
                <Image
                  alt={t('home.hero.imageAlt')}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src="/plaza/home/banner.png"
                />
              </div>

            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>

        {/* Featured Categories */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                {t('home.categories.title')}
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                {t('home.categories.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {giftCardCategories.map((category) => (
                <Link
                  aria-label={t('home.categories.browseAria', { category: category.name })}
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="group relative flex flex-col space-y-4 overflow-hidden rounded-2xl border bg-card shadow transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent" />
                    <Image
                      fill
                      src={category.image}
                      alt={category.name}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative z-20 -mt-6 p-4">
                    <div className="mb-1 text-lg font-medium">{category.name}</div>
                    <p className="text-sm text-muted-foreground">
                      {t('home.categories.count', { count: category.productCount })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Gift Cards */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                {t('home.featured.title')}
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                {t('home.featured.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredGiftCardsHomepage.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/products">
                <Button className="group h-12 px-8" size="lg" variant="outline">
                  {t('home.featured.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main >
    </>
  );
}
