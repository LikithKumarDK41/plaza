import { ArrowRight, Clock, ShoppingBag, Star, Truck, Gift, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HeroBadge } from "~/ui/components/hero-badge";
import { ProductCard } from "~/ui/components/product-card";
import { TestimonialsSection } from "~/ui/components/testimonials/testimonials-with-marquee";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";

import { categories, featuredProductsHomepage, testimonials, featuredGiftCardsHomepage, giftCardCategories } from "./mocks";

const featuresWhyChooseUs = [
  {
    description:
      "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: "Free Shipping",
  },
  {
    description:
      "Your payment information is always safe and secure with us. We use industry-leading encryption.",
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    title: "Secure Checkout",
  },
  {
    description:
      "Our customer support team is always available to help with any questions or concerns.",
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "24/7 Support",
  },
  {
    description:
      "We stand behind the quality of every product we sell. 30-day money-back guarantee.",
    icon: <Star className="h-6 w-6 text-primary" />,
    title: "Quality Guarantee",
  },
];

export default function HomePage() {
  return (
    <>
      <main
        className={`
          flex min-h-screen flex-col gap-y-16 bg-gradient-to-b from-muted/50
          via-muted/25 to-background
        `}
      >
        {/* Hero Section */}
        <section
          className="
    relative overflow-hidden py-14
    md:py-14
  "
        >
          <div
            className="
      bg-grid-black/[0.02] absolute inset-0
      bg-[length:20px_20px]
    "
          />
          <div
            className="
      relative z-10 container mx-auto max-w-7xl px-4
      sm:px-6
      lg:px-8
    "
          >
            <div
              className="
        grid items-center gap-10
        lg:grid-cols-2 lg:gap-12
      "
            >
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1
                    className="
              font-display text-4xl leading-tight font-bold
              tracking-tight text-foreground
              sm:text-5xl
              md:text-6xl
              lg:leading-[1.1]
            "
                  >
                    Celebrate Moments with{" "}
                    <span
                      className="
                bg-gradient-to-r from-primary to-primary/70 bg-clip-text
                text-transparent
              "
                    >
                      Digital Gift Cards
                    </span>
                  </h1>
                  <p
                    className="
              max-w-[700px] text-lg text-muted-foreground
              md:text-xl
            "
                  >
                    Send instant joy with personalized gift cards for birthdays, anniversaries, festivals, and more – all in one place at GiftPlaza.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/products">
                    <Button className="h-12 gap-1.5 px-8 transition-colors duration-200" size="lg">
                      Browse Gift Cards <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button className="h-12 px-8 transition-colors duration-200" size="lg" variant="outline">
                      How It Works
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Gift className="h-5 w-5 text-primary/70" />
                    <span>Instant digital delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-5 w-5 text-primary/70" />
                    <span>Custom designs for every occasion</span>
                  </div>
                </div>
              </div>
              <div
                className="
          relative mx-auto hidden aspect-square w-full max-w-md
          overflow-hidden rounded-xl border shadow-lg
          lg:block
        "
              >
                <div
                  className="
            absolute inset-0 z-10 bg-gradient-to-tr from-primary/20
            via-transparent to-transparent
          "
                />
                <Image
                  alt="GiftPlaza Hero"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src="/plaza/home/banner.png"
                />

              </div>
            </div>
          </div>
          <div
            className="
      absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent
      via-primary/20 to-transparent
    "
          />
        </section>

        {/* Featured Categories */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                Shop by Category
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Explore gift cards for every occasion
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {giftCardCategories.map((category) => (
                <Link
                  aria-label={`Browse ${category.name} gift cards`}
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
                      {category.productCount} gift cards
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
                Featured Gift Cards
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Discover our top-rated and trending gift cards
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
                  View All Gift Cards
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
