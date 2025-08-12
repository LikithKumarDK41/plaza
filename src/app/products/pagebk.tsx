"use client";

import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";

/* ------------------ Gift Card Data (your provided list) ------------------ */
const featuredGiftCardsHomepage = [
  {
    id: "1",
    name: "Digital Gift Card - ₹500",
    category: "Birthday",
    image: "/plaza/home/giftcards/gift-card1.png",
    inStock: true,
    originalPrice: 500,
    price: 500,
    rating: 5.0,
  },
  {
    id: "2",
    name: "Anniversary Gift Card - ₹1000",
    category: "Anniversary",
    image: "/plaza/home/giftcards/gift-card2.png",
    inStock: true,
    originalPrice: 1000,
    price: 1000,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Festival Gift Card - ₹2000",
    category: "Festivals",
    image: "/plaza/home/giftcards/gift-card3.png",
    inStock: true,
    originalPrice: 2000,
    price: 2000,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Thank You Gift Card - ₹300",
    category: "Thank You",
    image: "/plaza/home/giftcards/gift-card4.png",
    inStock: true,
    originalPrice: 300,
    price: 300,
    rating: 4.7,
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Category = string;

interface Product {
  category: string;
  id: string;
  image: string;
  inStock: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
}

/* -------------------------------------------------------------------------- */
/*                            Helpers / utilities                             */
/* -------------------------------------------------------------------------- */

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  const { addItem } = useCart();

  /* ----------------------- Categories (derived) ------------------------- */
  const categories: Category[] = React.useMemo(() => {
    const dynamic = Array.from(
      new Set(featuredGiftCardsHomepage.map((p) => p.category))
    ).sort();
    return ["All", ...dynamic];
  }, []);

  /* ----------------------------- State ---------------------------------- */
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("All");

  /* --------------------- Filtered products (memo) ----------------------- */
  const filteredProducts = React.useMemo(
    () =>
      selectedCategory === "All"
        ? featuredGiftCardsHomepage
        : featuredGiftCardsHomepage.filter(
          (p) => p.category === selectedCategory
        ),
    [selectedCategory]
  );

  /* --------------------------- Handlers --------------------------------- */
  const handleAddToCart = React.useCallback(
    (productId: string) => {
      const product = featuredGiftCardsHomepage.find((p) => p.id === productId);
      if (product) {
        addItem(
          {
            category: product.category,
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
          },
          1
        );
      }
    },
    [addItem]
  );

  const handleAddToWishlist = React.useCallback((productId: string) => {
    // TODO: integrate with Wishlist feature
    console.log(`Added ${productId} to wishlist`);
  }, []);

  /* ----------------------------- Render --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container">
          {/* Heading & filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gift Cards</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Choose from our themed gift cards to surprise your loved ones.
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  aria-pressed={category === selectedCategory}
                  className="rounded-full"
                  key={slugify(category)}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  title={`Filter by ${category}`}
                  variant={
                    category === selectedCategory ? "default" : "outline"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                product={product}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                No gift cards found in this category.
              </p>
            </div>
          )}

          {/* Pagination */}
          <nav
            aria-label="Pagination"
            className="mt-12 flex items-center justify-center gap-2"
          >
            <Button disabled variant="outline">
              Previous
            </Button>
            <Button aria-current="page" variant="default">
              1
            </Button>
            <Button disabled variant="outline">
              Next
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
}
