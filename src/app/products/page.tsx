"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";

/* shadcn primitives */
import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Checkbox } from "~/ui/primitives/checkbox";
import { Slider } from "~/ui/primitives/slider";
import { Switch } from "~/ui/primitives/switch";
import { Popover, PopoverTrigger, PopoverContent } from "~/ui/primitives/popover";
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
} from "~/ui/primitives/command";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter,
} from "~/ui/primitives/sheet";

/* -------------------------------------------------------------------------- */
/*                              Sample product data                            */
/* -------------------------------------------------------------------------- */
const featuredGiftCardsHomepage = [
  { id: "1", name: "Digital Gift Card", category: "Birthday", useCase: "Gifting", series: "Classic", recipient: "Anyone", theme: "Minimal", area: "Pan-India", image: "/plaza/home/giftcards/gift-card1.png", inStock: true, originalPrice: 500, price: 500, rating: 5.0 },
  { id: "2", name: "Anniversary Gift Card", category: "Anniversary", useCase: "Couples", series: "Premium", recipient: "Couple", theme: "Romantic", area: "Metro", image: "/plaza/home/giftcards/gift-card2.png", inStock: true, originalPrice: 1000, price: 1000, rating: 4.8 },
  { id: "3", name: "Festival Gift Card", category: "Festivals", useCase: "Seasonal", series: "Premium", recipient: "Family", theme: "Festive", area: "Pan-India", image: "/plaza/home/giftcards/gift-card3.png", inStock: true, originalPrice: 2000, price: 2000, rating: 4.9 },
  { id: "4", name: "Thank You Gift Card", category: "Thank You", useCase: "Appreciation", series: "Classic", recipient: "Colleague", theme: "Thank You", area: "Online", image: "/plaza/home/giftcards/gift-card4.png", inStock: true, originalPrice: 300, price: 300, rating: 4.7 },
  { id: "5", name: "Digital Gift Card", category: "Birthday", useCase: "Gifting", series: "Classic", recipient: "Anyone", theme: "Minimal", area: "Pan-India", image: "/plaza/home/giftcards/gift-card1.png", inStock: true, originalPrice: 500, price: 500, rating: 5.0 },
  { id: "6", name: "Anniversary Gift Card", category: "Anniversary", useCase: "Couples", series: "Premium", recipient: "Couple", theme: "Romantic", area: "Metro", image: "/plaza/home/giftcards/gift-card2.png", inStock: true, originalPrice: 1000, price: 1000, rating: 4.8 },
  { id: "7", name: "Festival Gift Card", category: "Festivals", useCase: "Seasonal", series: "Premium", recipient: "Family", theme: "Festive", area: "Pan-India", image: "/plaza/home/giftcards/gift-card3.png", inStock: true, originalPrice: 2000, price: 2000, rating: 4.9 },
  { id: "8", name: "Thank You Gift Card", category: "Thank You", useCase: "Appreciation", series: "Classic", recipient: "Colleague", theme: "Thank You", area: "Online", image: "/plaza/home/giftcards/gift-card4.png", inStock: true, originalPrice: 300, price: 300, rating: 4.7 },
] as const;

type Category = string;
type Series = string;
type UseCase = string;
type Recipient = string;
type Theme = string;
type Area = string;

const slugify = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */
/* Combobox helper (i18n-aware)                                               */
/* -------------------------------------------------------------------------- */
function Combobox({
  label,
  placeholder,
  value,
  onChange,
  options,
  renderOption,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  renderOption?: (opt: string) => string;
}) {
  const [open, setOpen] = React.useState(false);
  const selected = value || "";
  const { t } = useTranslation("common");

  const searchPlaceholder = t("products.combobox.search", { label });

  return (
    <div className="w-full">
      <Label className="mb-1 block text-xs text-muted-foreground">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between h-10 px-3 rounded-lg">
            <span className="truncate">{selected ? (renderOption ? renderOption(selected) : selected) : placeholder}</span>
            <span aria-hidden>▾</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0 w-[--radix-popover-trigger-width]">
          <Command className="w-full">
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>{t("products.combobox.noResults")}</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value=""
                  className="h-9"
                  onSelect={() => {
                    onChange("");
                    setOpen(false);
                  }}
                >
                  {placeholder}
                </CommandItem>
                {options.map((opt) => (
                  <CommandItem
                    key={opt}
                    value={opt}
                    className="h-9"
                    onSelect={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                  >
                    {renderOption ? renderOption(opt) : opt}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Filters panel (i18n-aware)                                                  */
/* -------------------------------------------------------------------------- */
function FiltersPanel({
  categories, seriesList, useCases, range, setRange, minPrice, maxPrice,
  selectedCategories, toggleCategory, selectedSeries, toggleSeries,
  selectedUseCases, toggleUse, ratingAtLeast, setRatingAtLeast,
  inStockOnly, setInStockOnly, sortBy, setSortBy, quickPreset, onClearAll,
}: {
  categories: string[]; seriesList: string[]; useCases: string[];
  range: number[]; setRange: (v: number[]) => void; minPrice: number; maxPrice: number;
  selectedCategories: Set<string>; toggleCategory: (c: string) => void;
  selectedSeries: Set<string>; toggleSeries: (s: string) => void;
  selectedUseCases: Set<string>; toggleUse: (u: string) => void;
  ratingAtLeast: number; setRatingAtLeast: (n: number) => void;
  inStockOnly: boolean; setInStockOnly: (b: boolean) => void;
  sortBy: "relevance" | "price-asc" | "price-desc" | "rating-desc"; setSortBy: (v: "relevance" | "price-asc" | "price-desc" | "rating-desc") => void;
  quickPreset: (v: string) => void; onClearAll: () => void;
}) {
  const [priceMin, priceMax] = range;
  const { t } = useTranslation("common");

  // map sort keys to localized labels (keeps values stable for logic)
  const sortLabel = (key: "relevance" | "price-asc" | "price-desc" | "rating-desc") =>
  ({
    "relevance": t("products.sort.relevance"),
    "price-asc": t("products.sort.priceAsc"),
    "price-desc": t("products.sort.priceDesc"),
    "rating-desc": t("products.sort.ratingDesc"),
  }[key]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("products.filters.title")}</h2>
        <Button variant="ghost" size="sm" onClick={onClearAll} className="h-8">
          {t("products.filters.clear")}
        </Button>
      </div>

      <section>
        <Label className="mb-2 block text-sm">{t("products.filters.categories")}</Label>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={slugify(c)} className="flex items-center gap-2 text-sm">
              <Checkbox checked={selectedCategories.has(c)} onCheckedChange={() => toggleCategory(c)} />
              <span className="truncate">{c}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <Label className="mb-2 block text-sm">{t("products.filters.series")}</Label>
        <div className="space-y-2">
          {seriesList.map((s) => (
            <label key={slugify(s)} className="flex items-center gap-2 text-sm">
              <Checkbox checked={selectedSeries.has(s)} onCheckedChange={() => toggleSeries(s)} />
              <span className="truncate">{s}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <Label className="mb-2 block text-sm">{t("products.filters.use")}</Label>
        <div className="space-y-2">
          {useCases.map((u) => (
            <label key={slugify(u)} className="flex items-center gap-2 text-sm">
              <Checkbox checked={selectedUseCases.has(u)} onCheckedChange={() => toggleUse(u)} />
              <span className="truncate">{u}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <Label className="mb-2 block text-sm">{t("products.filters.price", { currency: "¥" })}</Label>
        <div className="px-2">
          <Slider value={range} min={minPrice} max={maxPrice} step={50} onValueChange={(v) => setRange(v as number[])} />
        </div>
        <div className="mt-2 px-1 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>¥{priceMin}</span><span>¥{priceMax}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[{ l: "≤ ¥500", v: "0-500" }, { l: "¥500–¥1000", v: "500-1000" }, { l: "¥1000–¥2000", v: "1000-2000" }, { l: "≥ ¥2000", v: "2000+" }].map(r => (
            <Button key={r.v} size="sm" className="h-9 px-3" variant="outline" onClick={() => quickPreset(r.v)}>{r.l}</Button>
          ))}
        </div>
      </section>

      <section>
        <Label className="mb-2 block text-sm">{t("products.filters.rating")}</Label>
        <div className="flex flex-wrap gap-2">
          {[0, 4.0, 4.5].map((r) => (
            <Button
              key={r}
              size="sm"
              className="h-9 px-3"
              variant={ratingAtLeast === r ? "default" : "outline"}
              onClick={() => setRatingAtLeast(r)}
            >
              {r === 0 ? t("products.filters.any") : `${r}+`}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <Label className="text-sm">{t("products.filters.inStockOnly")}</Label>
          <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
        </div>
      </section>

      <section>
        <Label className="mb-2 block text-sm">{t("products.filters.sortBy")}</Label>
        <Combobox
          label=""
          placeholder={sortLabel("relevance")}
          value={sortBy}
          onChange={(v) => setSortBy((v as any) || "relevance")}
          options={["relevance", "price-asc", "price-desc", "rating-desc"]}
          renderOption={(opt) => sortLabel(opt as any)}
        />
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  const cart = useCart();
  const { t } = useTranslation("common");

  /* derived lists */
  const categories = React.useMemo<Category[]>(() => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.category))).sort(), []);
  const seriesList = React.useMemo<Series[]>(() => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.series))).sort(), []);
  const useCases = React.useMemo<UseCase[]>(() => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.useCase))).sort(), []);
  const recipients = React.useMemo<Recipient[]>(() => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.recipient))).sort(), []);
  const themes = React.useMemo<Theme[]>(() => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.theme))).sort(), []);
  const areas = React.useMemo<Area[]>(() => Array.from(new Set(featuredGiftCardsHomepage.map((p) => p.area))).sort(), []);

  const minAvailablePrice = React.useMemo(() => Math.min(...featuredGiftCardsHomepage.map((p) => p.price)), []);
  const maxAvailablePrice = React.useMemo(() => Math.max(...featuredGiftCardsHomepage.map((p) => p.price)), []);

  /* state */
  const [searchTerm, setSearchTerm] = React.useState("");

  // left facets
  const [selectedCategories, setSelectedCategories] = React.useState<Set<Category>>(new Set());
  const [selectedSeries, setSelectedSeries] = React.useState<Set<Series>>(new Set());
  const [selectedUseCases, setSelectedUseCases] = React.useState<Set<UseCase>>(new Set());
  const [range, setRange] = React.useState<number[]>([minAvailablePrice, maxAvailablePrice]);
  const [ratingAtLeast, setRatingAtLeast] = React.useState<number>(0);
  const [inStockOnly, setInStockOnly] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<"relevance" | "price-asc" | "price-desc" | "rating-desc">("relevance");

  // top advanced (applied)
  const [selectedRecipient, setSelectedRecipient] = React.useState<Recipient | "">("");
  const [selectedTheme, setSelectedTheme] = React.useState<Theme | "">("");
  const [selectedArea, setSelectedArea] = React.useState<Area | "">("");

  // top advanced (draft)
  const [draftUse, setDraftUse] = React.useState<UseCase | "">("");
  const [draftRecipient, setDraftRecipient] = React.useState<Recipient | "">("");
  const [draftTheme, setDraftTheme] = React.useState<Theme | "">("");
  const [draftArea, setDraftArea] = React.useState<Area | "">("");
  const [draftPricePreset, setDraftPricePreset] = React.useState<string>("");

  // mobile sheets
  const [openFilters, setOpenFilters] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);

  /* helpers */
  const toggleFromSet = <T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) =>
    setter((prev) => { const next = new Set(prev); next.has(value) ? next.delete(value) : next.add(value); return next; });

  const clearAll = () => {
    setSelectedCategories(new Set()); setSelectedSeries(new Set()); setSelectedUseCases(new Set());
    setRange([minAvailablePrice, maxAvailablePrice]); setRatingAtLeast(0); setInStockOnly(false); setSortBy("relevance");
    setSearchTerm(""); setSelectedRecipient(""); setSelectedTheme(""); setSelectedArea("");
    setDraftUse(""); setDraftRecipient(""); setDraftTheme(""); setDraftArea(""); setDraftPricePreset("");
  };

  const applyAdvanced = () => {
    setSelectedUseCases(() => { const s = new Set<UseCase>(); if (draftUse) s.add(draftUse); return s; });
    if (draftPricePreset) {
      if (draftPricePreset === "2000+") setRange([2000, maxAvailablePrice]);
      else { const [lo, hi] = draftPricePreset.split("-").map(Number); setRange([Math.max(minAvailablePrice, lo), Math.min(maxAvailablePrice, hi)]); }
    }
    setSelectedRecipient(draftRecipient || ""); setSelectedTheme(draftTheme || ""); setSelectedArea(draftArea || "");
  };

  const resetAdvanced = () => {
    setDraftUse(""); setDraftRecipient(""); setDraftTheme(""); setDraftArea(""); setDraftPricePreset("");
    setSelectedUseCases(new Set()); setSelectedRecipient(""); setSelectedTheme(""); setSelectedArea("");
    setRange([minAvailablePrice, maxAvailablePrice]);
  };

  /* filtering */
  const [priceMin, priceMax] = range;
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
      return bySearch && byCategory && bySeries && byUse && byRecipient && byTheme && byArea && byPrice && byStock && byRating;
    });
    switch (sortBy) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating-desc": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [searchTerm, selectedCategories, selectedSeries, selectedUseCases, selectedRecipient, selectedTheme, selectedArea, priceMin, priceMax, inStockOnly, ratingAtLeast, sortBy]);

  /* cart handlers */
  const handleAddToCart = (id: string) => {
    const p = featuredGiftCardsHomepage.find((x) => x.id === id);
    if (!p) return;
    cart.addItem({ category: p.category, id: p.id, image: p.image, name: p.name, price: p.price }, 1);
  };
  const handleAddToWishlist = (id: string) => console.log("wish", id);

  /* quick preset helper for price */
  const quickPreset = (v: string) => { setDraftPricePreset(v); setTimeout(applyAdvanced, 0); };

  /* UI */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-6 sm:py-8 md:py-10">
        <div className="container mx-auto grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* Mobile top bar: TWO buttons */}
          <div className="md:hidden flex items-center justify-between px-1">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9" onClick={() => setOpenFilters(true)}>
                {t("products.mobile.filters")}
              </Button>
              <Button variant="default" size="sm" className="h-9" onClick={() => setOpenSearch(true)}>
                {t("products.mobile.search")}
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {t("products.results", { count: filteredProducts.length })}
            </span>
          </div>

          {/* LEFT sidebar (md+): Filters */}
          <aside className="hidden md:block sticky top-20 self-start h-fit">
            <FiltersPanel
              categories={categories} seriesList={seriesList} useCases={useCases}
              range={range} setRange={setRange} minPrice={minAvailablePrice} maxPrice={maxAvailablePrice}
              selectedCategories={selectedCategories} toggleCategory={(c) => toggleFromSet(setSelectedCategories, c)}
              selectedSeries={selectedSeries} toggleSeries={(s) => toggleFromSet(setSelectedSeries, s)}
              selectedUseCases={selectedUseCases} toggleUse={(u) => toggleFromSet(setSelectedUseCases, u)}
              ratingAtLeast={ratingAtLeast} setRatingAtLeast={setRatingAtLeast}
              inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
              sortBy={sortBy} setSortBy={setSortBy}
              quickPreset={quickPreset} onClearAll={clearAll}
            />
          </aside>

          {/* RIGHT: content (top advanced bar + grid) */}
          <section>
            {/* Advanced Search Bar (md+ only) */}
            <div className="hidden md:block mb-5 rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 shadow-sm">
              <div className="grid gap-4 p-4 md:grid-cols-12 md:items-end">
                <div className="md:col-span-3">
                  <Combobox
                    label={t("products.advanced.use")}
                    placeholder={t("products.combobox.notSpecified")}
                    value={draftUse}
                    onChange={(v) => setDraftUse(v as UseCase)}
                    options={useCases}
                  />
                </div>
                <div className="md:col-span-3">
                  <Combobox
                    label={t("products.advanced.recipient")}
                    placeholder={t("products.combobox.notSpecified")}
                    value={draftRecipient}
                    onChange={(v) => setDraftRecipient(v as Recipient)}
                    options={recipients}
                  />
                </div>
                <div className="md:col-span-3">
                  <Combobox
                    label={t("products.advanced.theme")}
                    placeholder={t("products.combobox.notSpecified")}
                    value={draftTheme}
                    onChange={(v) => setDraftTheme(v as Theme)}
                    options={themes}
                  />
                </div>
                <div className="md:col-span-3">
                  <Combobox
                    label={t("products.advanced.price")}
                    placeholder={t("products.combobox.notSpecified")}
                    value={draftPricePreset}
                    onChange={setDraftPricePreset}
                    options={["0-500", "500-1000", "1000-2000", "2000+"]}
                  />
                </div>
                <div className="md:col-span-3">
                  <Combobox
                    label={t("products.advanced.area")}
                    placeholder={t("products.combobox.notSpecified")}
                    value={draftArea}
                    onChange={(v) => setDraftArea(v as Area)}
                    options={areas}
                  />
                </div>
                <div className="md:col-span-6">
                  <Label className="mb-1 block text-xs text-muted-foreground">
                    {t("products.advanced.keywordsLabel")}
                  </Label>
                  <Input
                    className="h-10"
                    placeholder={t("products.advanced.keywordsPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3 flex gap-2 md:justify-end">
                  <Button variant="outline" className="h-10 px-4" onClick={resetAdvanced}>
                    {t("products.actions.reset")}
                  </Button>
                  <Button className="h-10 px-4" onClick={applyAdvanced}>
                    {t("products.actions.search")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Info line (desktop only) */}
            <div className="hidden md:block mb-3 text-right text-sm text-muted-foreground">
              {t("products.results", { count: filteredProducts.length })}
            </div>

            {/* Product Grid */}
            <div className="grid gap-6 lg:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard
                    product={product as any}
                    onAddToCart={(id) => {
                      const p = featuredGiftCardsHomepage.find((x) => x.id === id);
                      if (p) cart.addItem({ category: p.category, id: p.id, image: p.image, name: p.name, price: p.price }, 1);
                    }}
                    onAddToWishlist={(id) => console.log("wish", id)}
                    // @ts-ignore – only if your ProductCard accepts className
                    className="h-full flex flex-col"
                  />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-8 text-center text-muted-foreground">
                {t("products.empty")}
              </div>
            )}

            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
              <Button disabled variant="outline">{t("products.pagination.prev")}</Button>
              <Button aria-current="page" variant="default">1</Button>
              <Button disabled variant="outline">{t("products.pagination.next")}</Button>
            </nav>
          </section>
        </div>
      </main>

      {/* MOBILE SHEET — Filters (left) */}
      <Sheet open={openFilters} onOpenChange={setOpenFilters}>
        <SheetTrigger asChild><button hidden aria-hidden /></SheetTrigger>
        <SheetContent side="left" className="w-full max-w-md overflow-y-auto p-0">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle>{t("products.filters.title")}</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-24 pt-4">
            <FiltersPanel
              categories={categories} seriesList={seriesList} useCases={useCases}
              range={range} setRange={setRange} minPrice={minAvailablePrice} maxPrice={maxAvailablePrice}
              selectedCategories={selectedCategories} toggleCategory={(c) => toggleFromSet(setSelectedCategories, c)}
              selectedSeries={selectedSeries} toggleSeries={(s) => toggleFromSet(setSelectedSeries, s)}
              selectedUseCases={selectedUseCases} toggleUse={(u) => toggleFromSet(setSelectedUseCases, u)}
              ratingAtLeast={ratingAtLeast} setRatingAtLeast={setRatingAtLeast}
              inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
              sortBy={sortBy} setSortBy={setSortBy}
              quickPreset={(v) => { setDraftPricePreset(v); setTimeout(applyAdvanced, 0); }}
              onClearAll={clearAll}
            />
          </div>
          <SheetFooter className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur px-4 py-3 border-t shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
            <Button className="w-full h-10" onClick={() => setOpenFilters(false)}>
              {t("products.mobile.applyClose")}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* MOBILE SHEET — Search (right) */}
      <Sheet open={openSearch} onOpenChange={setOpenSearch}>
        <SheetTrigger asChild><button hidden aria-hidden /></SheetTrigger>
        <SheetContent side="right" className="w-full max-w-md overflow-y-auto p-0">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle>{t("products.mobile.search")}</SheetTitle>
          </SheetHeader>
          <div className="px-4 pt-4">
            <div className="rounded-xl border p-4 space-y-4">
              <Combobox
                label={t("products.advanced.use")}
                placeholder={t("products.combobox.notSpecified")}
                value={draftUse}
                onChange={(v) => setDraftUse(v as UseCase)}
                options={useCases}
              />
              <Combobox
                label={t("products.advanced.recipient")}
                placeholder={t("products.combobox.notSpecified")}
                value={draftRecipient}
                onChange={(v) => setDraftRecipient(v as Recipient)}
                options={recipients}
              />
              <Combobox
                label={t("products.advanced.theme")}
                placeholder={t("products.combobox.notSpecified")}
                value={draftTheme}
                onChange={(v) => setDraftTheme(v as Theme)}
                options={themes}
              />
              <Combobox
                label={t("products.advanced.price")}
                placeholder={t("products.combobox.notSpecified")}
                value={draftPricePreset}
                onChange={setDraftPricePreset}
                options={["0-500", "500-1000", "1000-2000", "2000+"]}
              />
              <Combobox
                label={t("products.advanced.area")}
                placeholder={t("products.combobox.notSpecified")}
                value={draftArea}
                onChange={(v) => setDraftArea(v as Area)}
                options={areas}
              />
              <div>
                <Label className="mb-1 block text-xs text-muted-foreground">
                  {t("products.advanced.keywordsLabel")}
                </Label>
                <Input
                  className="h-10"
                  placeholder={t("products.advanced.keywordsPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10" onClick={resetAdvanced}>
                  {t("products.actions.reset")}
                </Button>
                <Button className="h-10" onClick={() => { applyAdvanced(); setOpenSearch(false); }}>
                  {t("products.actions.search")}
                </Button>
              </div>
            </div>
          </div>
          <div className="h-4" />
        </SheetContent>
      </Sheet>
    </div>
  );
}
