"use client";

import { useState, useMemo } from "react";
import ProductCard, { Product } from "./ProductCard";
import ProductModal from "./ProductModal";
import { Search } from "lucide-react";

interface ProductsSectionProps {
  products: Product[];
}

const ALL = "All";

export default function ProductsSection({ products }: ProductsSectionProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return [ALL, ...cats];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState(ALL);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchesCat =
        activeCategory === ALL || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <>
      <section id="products" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Our Products
            </h2>
            <p className="text-gray-500 text-lg">
              Professional Global Clean chemicals — all prices include 18% VAT.
            </p>
          </div>

          {/* Search + filters */}
          <div className="mb-8 flex flex-col gap-4">
            {/* Search bar */}
            <div className="relative max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#669cad]/40 focus:border-[#669cad] transition"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#669cad] text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#669cad] hover:text-[#669cad]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-400 mb-6 font-medium">
            Showing {filtered.length} of {products.length} products
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <svg
                className="mx-auto mb-4 opacity-30"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
