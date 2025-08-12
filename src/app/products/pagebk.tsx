// "use client";

// import * as React from "react";

// import { useCart } from "~/lib/hooks/use-cart";
// import { ProductCard } from "~/ui/components/product-card";
// import { Button } from "~/ui/primitives/button";

// /* ------------------ Gift Card Data (your provided list) ------------------ */
// const featuredGiftCardsHomepage = [
//   {
//     id: "1",
//     name: "Digital Gift Card - ₹500",
//     category: "Birthday",
//     image: "/plaza/home/giftcards/gift-card1.png",
//     inStock: true,
//     originalPrice: 500,
//     price: 500,
//     rating: 5.0,
//   },
//   {
//     id: "2",
//     name: "Anniversary Gift Card - ₹1000",
//     category: "Anniversary",
//     image: "/plaza/home/giftcards/gift-card2.png",
//     inStock: true,
//     originalPrice: 1000,
//     price: 1000,
//     rating: 4.8,
//   },
//   {
//     id: "3",
//     name: "Festival Gift Card - ₹2000",
//     category: "Festivals",
//     image: "/plaza/home/giftcards/gift-card3.png",
//     inStock: true,
//     originalPrice: 2000,
//     price: 2000,
//     rating: 4.9,
//   },
//   {
//     id: "4",
//     name: "Thank You Gift Card - ₹300",
//     category: "Thank You",
//     image: "/plaza/home/giftcards/gift-card4.png",
//     inStock: true,
//     originalPrice: 300,
//     price: 300,
//     rating: 4.7,
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /*                                   Types                                    */
// /* -------------------------------------------------------------------------- */

// type Category = string;

// interface Product {
//   category: string;
//   id: string;
//   image: string;
//   inStock: boolean;
//   name: string;
//   originalPrice?: number;
//   price: number;
//   rating: number;
// }

// /* -------------------------------------------------------------------------- */
// /*                            Helpers / utilities                             */
// /* -------------------------------------------------------------------------- */

// const slugify = (str: string) =>
//   str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

// /* -------------------------------------------------------------------------- */
// /*                              Component                                     */
// /* -------------------------------------------------------------------------- */

// export default function ProductsPage() {
//   const { addItem } = useCart();

//   /* ----------------------- Categories (derived) ------------------------- */
//   const categories: Category[] = React.useMemo(() => {
//     const dynamic = Array.from(
//       new Set(featuredGiftCardsHomepage.map((p) => p.category))
//     ).sort();
//     return ["All", ...dynamic];
//   }, []);

//   /* ----------------------------- State ---------------------------------- */
//   const [selectedCategory, setSelectedCategory] =
//     React.useState<Category>("All");

//   /* --------------------- Filtered products (memo) ----------------------- */
//   const filteredProducts = React.useMemo(
//     () =>
//       selectedCategory === "All"
//         ? featuredGiftCardsHomepage
//         : featuredGiftCardsHomepage.filter(
//           (p) => p.category === selectedCategory
//         ),
//     [selectedCategory]
//   );

//   /* --------------------------- Handlers --------------------------------- */
//   const handleAddToCart = React.useCallback(
//     (productId: string) => {
//       const product = featuredGiftCardsHomepage.find((p) => p.id === productId);
//       if (product) {
//         addItem(
//           {
//             category: product.category,
//             id: product.id,
//             image: product.image,
//             name: product.name,
//             price: product.price,
//           },
//           1
//         );
//       }
//     },
//     [addItem]
//   );

//   const handleAddToWishlist = React.useCallback((productId: string) => {
//     // TODO: integrate with Wishlist feature
//     console.log(`Added ${productId} to wishlist`);
//   }, []);

//   /* ----------------------------- Render --------------------------------- */
//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="flex-1 py-10">
//         <div className="container">
//           {/* Heading & filters */}
//           <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">Gift Cards</h1>
//               <p className="mt-1 text-lg text-muted-foreground">
//                 Choose from our themed gift cards to surprise your loved ones.
//               </p>
//             </div>

//             {/* Category pills */}
//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <Button
//                   aria-pressed={category === selectedCategory}
//                   className="rounded-full"
//                   key={slugify(category)}
//                   onClick={() => setSelectedCategory(category)}
//                   size="sm"
//                   title={`Filter by ${category}`}
//                   variant={
//                     category === selectedCategory ? "default" : "outline"
//                   }
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Product grid */}
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 onAddToCart={handleAddToCart}
//                 onAddToWishlist={handleAddToWishlist}
//                 product={product}
//               />
//             ))}
//           </div>

//           {/* Empty state */}
//           {filteredProducts.length === 0 && (
//             <div className="mt-8 text-center">
//               <p className="text-muted-foreground">
//                 No gift cards found in this category.
//               </p>
//             </div>
//           )}

//           {/* Pagination */}
//           <nav
//             aria-label="Pagination"
//             className="mt-12 flex items-center justify-center gap-2"
//           >
//             <Button disabled variant="outline">
//               Previous
//             </Button>
//             <Button aria-current="page" variant="default">
//               1
//             </Button>
//             <Button disabled variant="outline">
//               Next
//             </Button>
//           </nav>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import * as React from "react";
import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";

/* -------------------------------------------------------------------------- */
/*                                Sample Data                                 */
/*  (added series, useCase, recipient, theme, area to power advanced filters)  */
/* -------------------------------------------------------------------------- */
const featuredGiftCardsHomepage = [
  {
    id: "1",
    name: "Digital Gift Card - ₹500",
    category: "Birthday",
    useCase: "Gifting",
    series: "Classic",
    recipient: "Anyone",
    theme: "Minimal",
    area: "Pan-India",
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
    useCase: "Couples",
    series: "Premium",
    recipient: "Couple",
    theme: "Romantic",
    area: "Metro",
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
    useCase: "Seasonal",
    series: "Premium",
    recipient: "Family",
    theme: "Festive",
    area: "Pan-India",
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
    useCase: "Appreciation",
    series: "Classic",
    recipient: "Colleague",
    theme: "Thank You",
    area: "Online",
    image: "/plaza/home/giftcards/gift-card4.png",
    inStock: true,
    originalPrice: 300,
    price: 300,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Digital Gift Card - ₹500",
    category: "Birthday",
    useCase: "Gifting",
    series: "Classic",
    recipient: "Anyone",
    theme: "Minimal",
    area: "Pan-India",
    image: "/plaza/home/giftcards/gift-card1.png",
    inStock: true,
    originalPrice: 500,
    price: 500,
    rating: 5.0,
  },
  {
    id: "6",
    name: "Anniversary Gift Card - ₹1000",
    category: "Anniversary",
    useCase: "Couples",
    series: "Premium",
    recipient: "Couple",
    theme: "Romantic",
    area: "Metro",
    image: "/plaza/home/giftcards/gift-card2.png",
    inStock: true,
    originalPrice: 1000,
    price: 1000,
    rating: 4.8,
  },
  {
    id: "7",
    name: "Festival Gift Card - ₹2000",
    category: "Festivals",
    useCase: "Seasonal",
    series: "Premium",
    recipient: "Family",
    theme: "Festive",
    area: "Pan-India",
    image: "/plaza/home/giftcards/gift-card3.png",
    inStock: true,
    originalPrice: 2000,
    price: 2000,
    rating: 4.9,
  },
  {
    id: "8",
    name: "Thank You Gift Card - ₹300",
    category: "Thank You",
    useCase: "Appreciation",
    series: "Classic",
    recipient: "Colleague",
    theme: "Thank You",
    area: "Online",
    image: "/plaza/home/giftcards/gift-card4.png",
    inStock: true,
    originalPrice: 300,
    price: 300,
    rating: 4.7,
  },
] as const;

type Category = string;
type Series = string;
type UseCase = string;
type Recipient = string;
type Theme = string;
type Area = string;

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  const { addItem } = useCart();

  /* ----------------------- derived lists for filters ----------------------- */
  const categories = React.useMemo<Category[]>(
    () => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.category))).sort(),
    []
  );
  const seriesList = React.useMemo<Series[]>(
    () => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.series))).sort(),
    []
  );
  const useCases = React.useMemo<UseCase[]>(
    () => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.useCase))).sort(),
    []
  );
  const recipients = React.useMemo<Recipient[]>(
    () => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.recipient))).sort(),
    []
  );
  const themes = React.useMemo<Theme[]>(
    () => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.theme))).sort(),
    []
  );
  const areas = React.useMemo<Area[]>(
    () => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.area))).sort(),
    []
  );

  const minAvailablePrice = React.useMemo(
    () => Math.min(...featuredGiftCardsHomepage.map((p) => p.price)),
    []
  );
  const maxAvailablePrice = React.useMemo(
    () => Math.max(...featuredGiftCardsHomepage.map((p) => p.price)),
    []
  );

  /* ------------------------------ state ----------------------------------- */
  // global search
  const [searchTerm, setSearchTerm] = React.useState("");

  // left sidebar (multi-select facets)
  const [selectedCategories, setSelectedCategories] = React.useState<Set<Category>>(new Set());
  const [selectedSeries, setSelectedSeries] = React.useState<Set<Series>>(new Set());
  const [selectedUseCases, setSelectedUseCases] = React.useState<Set<UseCase>>(new Set());
  const [priceMin, setPriceMin] = React.useState<number>(minAvailablePrice);
  const [priceMax, setPriceMax] = React.useState<number>(maxAvailablePrice);
  const [ratingAtLeast, setRatingAtLeast] = React.useState<number>(0);
  const [inStockOnly, setInStockOnly] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<"relevance" | "price-asc" | "price-desc" | "rating-desc">("relevance");

  // top advanced: applied values
  const [selectedRecipient, setSelectedRecipient] = React.useState<Recipient | "">("");
  const [selectedTheme, setSelectedTheme] = React.useState<Theme | "">("");
  const [selectedArea, setSelectedArea] = React.useState<Area | "">("");

  // top advanced: draft values (only applied on Search click)
  const [draftUse, setDraftUse] = React.useState<UseCase | "">("");
  const [draftRecipient, setDraftRecipient] = React.useState<Recipient | "">("");
  const [draftTheme, setDraftTheme] = React.useState<Theme | "">("");
  const [draftArea, setDraftArea] = React.useState<Area | "">("");
  const [draftPriceRange, setDraftPriceRange] = React.useState<string>(""); // e.g. "0-500","500-1000","1000-2000","2000+"

  /* ----------------------------- helpers ---------------------------------- */
  const toggleFromSet = <T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const clearAll = () => {
    setSelectedCategories(new Set());
    setSelectedSeries(new Set());
    setSelectedUseCases(new Set());
    setPriceMin(minAvailablePrice);
    setPriceMax(maxAvailablePrice);
    setRatingAtLeast(0);
    setInStockOnly(false);
    setSortBy("relevance");
    setSearchTerm("");

    setSelectedRecipient("");
    setSelectedTheme("");
    setSelectedArea("");
    setDraftUse("");
    setDraftRecipient("");
    setDraftTheme("");
    setDraftArea("");
    setDraftPriceRange("");
  };

  const applyAdvanced = () => {
    // map advanced Use (single) into left multi-select set
    setSelectedUseCases((prev) => {
      const next = new Set(prev);
      next.clear();
      if (draftUse) next.add(draftUse);
      return next;
    });

    // price presets
    if (draftPriceRange) {
      if (draftPriceRange === "2000+") {
        setPriceMin(2000);
        setPriceMax(maxAvailablePrice);
      } else {
        const [lo, hi] = draftPriceRange.split("-").map(Number);
        setPriceMin(Math.max(minAvailablePrice, lo));
        setPriceMax(Math.min(maxAvailablePrice, hi));
      }
    }

    setSelectedRecipient(draftRecipient || "");
    setSelectedTheme(draftTheme || "");
    setSelectedArea(draftArea || "");
  };

  const resetAdvanced = () => {
    setDraftUse("");
    setDraftRecipient("");
    setDraftTheme("");
    setDraftArea("");
    setDraftPriceRange("");

    // also clear applied advanced selections and price back to full range
    setSelectedUseCases(new Set());
    setSelectedRecipient("");
    setSelectedTheme("");
    setSelectedArea("");
    setPriceMin(minAvailablePrice);
    setPriceMax(maxAvailablePrice);
  };

  /* ------------------------------ filter ---------------------------------- */
  const filteredProducts = React.useMemo(() => {
    let list = featuredGiftCardsHomepage.filter((p) => {
      const bySearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const byCategory = selectedCategories.size ? selectedCategories.has(p.category) : true;
      const bySeries = selectedSeries.size ? selectedSeries.has(p.series) : true;
      const byUse = selectedUseCases.size ? selectedUseCases.has(p.useCase) : true;
      const byRecipient = selectedRecipient ? p.recipient === selectedRecipient : true;
      const byTheme = selectedTheme ? p.theme === selectedTheme : true;
      const byArea = selectedArea ? p.area === selectedArea : true;
      const byPrice = p.price >= priceMin && p.price <= priceMax;
      const byStock = inStockOnly ? p.inStock : true;
      const byRating = p.rating >= ratingAtLeast;

      return (
        bySearch &&
        byCategory &&
        bySeries &&
        byUse &&
        byRecipient &&
        byTheme &&
        byArea &&
        byPrice &&
        byStock &&
        byRating
      );
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [
    searchTerm,
    selectedCategories,
    selectedSeries,
    selectedUseCases,
    selectedRecipient,
    selectedTheme,
    selectedArea,
    priceMin,
    priceMax,
    inStockOnly,
    ratingAtLeast,
    sortBy,
  ]);

  /* ------------------------------ actions --------------------------------- */
  const handleAddToCart = (productId: string) => {
    const product = featuredGiftCardsHomepage.find((p) => p.id === productId);
    if (product) {
      addItem(
        { category: product.category, id: product.id, image: product.image, name: product.name, price: product.price },
        1
      );
    }
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Added ${productId} to wishlist`);
  };

  /* -------------------------------- UI ------------------------------------ */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ===================== LEFT: Sticky Filters ===================== */}
          <aside className="md:col-span-1 sticky top-20 self-start h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearAll} aria-label="Clear all filters">
                Clear all
              </Button>
            </div>

            {/* Categories (multi-select) */}
            <section className="mb-6">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((c) => (
                  <label key={slugify(c)} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedCategories.has(c)}
                      onChange={() => toggleFromSet(setSelectedCategories, c)}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Series */}
            <section className="mb-6">
              <h3 className="text-sm font-medium mb-2">Series</h3>
              <div className="space-y-2">
                {seriesList.map((s) => (
                  <label key={slugify(s)} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedSeries.has(s)}
                      onChange={() => toggleFromSet(setSelectedSeries, s)}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Use / Purpose (multi) */}
            <section className="mb-6">
              <h3 className="text-sm font-medium mb-2">Use</h3>
              <div className="space-y-2">
                {useCases.map((u) => (
                  <label key={slugify(u)} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedUseCases.has(u)}
                      onChange={() => toggleFromSet(setSelectedUseCases, u)}
                    />
                    <span>{u}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Price (manual + quick ranges) */}
            <section className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price (₹)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Min</span>
                  <Input
                    type="number"
                    min={minAvailablePrice}
                    max={priceMax}
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value || minAvailablePrice))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Max</span>
                  <Input
                    type="number"
                    min={priceMin}
                    max={maxAvailablePrice}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value || maxAvailablePrice))}
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { l: "≤ ₹500", v: "0-500" },
                  { l: "₹500–₹1000", v: "500-1000" },
                  { l: "₹1000–₹2000", v: "1000-2000" },
                  { l: "≥ ₹2000", v: "2000+" },
                ].map((r) => (
                  <Button
                    key={r.v}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDraftPriceRange(r.v);
                      // apply instantly from sidebar quick ranges
                      setTimeout(applyAdvanced, 0);
                    }}
                  >
                    {r.l}
                  </Button>
                ))}
              </div>
            </section>

            {/* Rating */}
            <section className="mb-6">
              <h3 className="text-sm font-medium mb-2">Rating</h3>
              <div className="flex flex-wrap gap-2">
                {[0, 4.0, 4.5].map((r) => (
                  <Button
                    key={r}
                    size="sm"
                    variant={ratingAtLeast === r ? "default" : "outline"}
                    onClick={() => setRatingAtLeast(r)}
                    aria-pressed={ratingAtLeast === r}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </Button>
                ))}
              </div>
            </section>

            {/* Stock */}
            <section className="mb-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In stock only
              </label>
            </section>

            {/* Sort */}
            <section className="mb-2">
              <h3 className="text-sm font-medium mb-2">Sort by</h3>
              <select
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </section>
          </aside>

          {/* ===================== RIGHT: Advanced + Search + Grid ===================== */}
          <section className="md:col-span-3">
            {/* Top Advanced Search Bar */}
            <div className="mb-6 rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 shadow-sm">
              <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-12 md:items-end">
                {/* Use */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">use</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={draftUse}
                    onChange={(e) => setDraftUse(e.target.value as any)}
                  >
                    <option value="">Not specified</option>
                    {useCases.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                {/* Who to give */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Who to give it to</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={draftRecipient}
                    onChange={(e) => setDraftRecipient(e.target.value as any)}
                  >
                    <option value="">Not specified</option>
                    {recipients.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Theme */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">theme</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={draftTheme}
                    onChange={(e) => setDraftTheme(e.target.value as any)}
                  >
                    <option value="">Not specified</option>
                    {themes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Price (preset) */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">price</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={draftPriceRange}
                    onChange={(e) => setDraftPriceRange(e.target.value)}
                  >
                    <option value="">Not specified</option>
                    <option value="0-500">≤ ₹500</option>
                    <option value="500-1000">₹500–₹1000</option>
                    <option value="1000-2000">₹1000–₹2000</option>
                    <option value="2000+">≥ ₹2000</option>
                  </select>
                </div>

                {/* Area */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">area</label>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={draftArea}
                    onChange={(e) => setDraftArea(e.target.value as any)}
                  >
                    <option value="">Not specified</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                {/* Free text search */}
                <div className="md:col-span-6">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">keywords</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search gift cards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex gap-2 md:justify-end">
                  <Button variant="outline" className="w-full md:w-auto" onClick={resetAdvanced}>
                    reset
                  </Button>
                  <Button className="w-full md:w-auto" onClick={applyAdvanced}>
                    search
                  </Button>
                </div>
              </div>
            </div>

            {/* Info line */}
            <div className="mb-3 text-right text-sm text-muted-foreground">
              Showing 1 – {Math.min(filteredProducts.length, 100)} of {filteredProducts.length} results
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="mt-8 text-center text-muted-foreground">No gift cards found.</div>
            )}

            {/* Pagination mock */}
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              <Button disabled variant="outline">Previous</Button>
              <Button aria-current="page" variant="default">1</Button>
              <Button disabled variant="outline">Next</Button>
            </nav>
          </section>
        </div>
      </main>
    </div>
  );
}
