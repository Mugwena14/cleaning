import { useMemo } from "react";
import { PackageSearch, X } from "lucide-react";
import ProductCard from "./ProductCard.jsx";
import { PRODUCTS } from "../data/Products.js";


function EmptyState({ searchQuery, activeCategory, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] flex items-center justify-center mb-5">
        <PackageSearch size={28} strokeWidth={1.5} className="text-[#94A3B8]" />
      </div>
      <h3
        className="text-[18px] font-bold text-[#111] mb-2"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        No products found
      </h3>
      <p
        className="text-[14px] text-[#94A3B8] max-w-xs leading-relaxed mb-6"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {searchQuery
          ? `Nothing matched "${searchQuery}"${activeCategory !== "All" ? ` in ${activeCategory}` : ""}.`
          : `No products in ${activeCategory} yet.`}
      </p>
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-[13px] font-medium text-[#111] border border-[#E5E7EB] hover:border-[#111] rounded-full px-5 py-2.5 transition-all duration-200"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <X size={13} strokeWidth={2} />
        Clear filters
      </button>
    </div>
  );
}

// ── Grid Header ───────────────────────────────────────────────────────────────

function GridHeader({ activeCategory, searchQuery, count, onClearSearch }) {
  return (
    <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
      <div>
        <h2
          className="text-[26px] font-black text-[#111] leading-tight"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {activeCategory === "All" ? "All Products" : activeCategory}
        </h2>
        <p
          className="text-[13px] text-[#94A3B8] mt-0.5"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {count} {count === 1 ? "product" : "products"} available
        </p>
      </div>

      {/* Active search query pill */}
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="flex items-center gap-2 bg-[#F1F5F9] hover:bg-[#E5E7EB] text-[#374151] text-[13px] font-medium rounded-full px-4 py-2 transition-all duration-150"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          <span className="text-[#94A3B8]">Search:</span>
          "{searchQuery}"
          <X size={13} strokeWidth={2.5} className="text-[#94A3B8]" />
        </button>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ProductGrid({
  activeCategory = "All",
  searchQuery = "",
  onOptions,
  onAddToCart,
  onClearSearch,
  onReset,
}) {
  // Filter products by category + search query
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch =
        activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const searchMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="shop" className="bg-[#FAFAFA]">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <GridHeader
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          count={filtered.length}
          onClearSearch={onClearSearch}
        />

        {filtered.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            onReset={onReset}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOptions={onOptions}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}