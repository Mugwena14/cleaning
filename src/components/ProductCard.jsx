import { useState } from "react";
import { ShoppingCart, SlidersHorizontal, Star } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function priceRange(options) {
  const prices = options.map((o) => o.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `R${min}` : `R${min} – R${max}`;
}

function formatReviews(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;
}

const BADGE_STYLES = {
  new:   "bg-[#DCFCE7] text-[#15803D]",
  sale:  "bg-[#FEE2E2] text-[#B91C1C]",
  promo: "bg-[#FEF3C7] text-[#92400E]",
};

const BADGE_LABELS = {
  new:   "New",
  sale:  "Sale",
  promo: "Promo",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function BadgePill({ badge }) {
  if (!badge || !BADGE_STYLES[badge]) return null;
  return (
    <span
      className={`${BADGE_STYLES[badge]} text-[11px] font-semibold px-2 py-0.5 rounded-full`}
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={11}
            strokeWidth={0}
            fill={i <= Math.round(rating) ? "#F59E0B" : "#E2E8F0"}
          />
        ))}
      </div>
      <span
        className="text-[11px] text-[#94A3B8]"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {rating} · {formatReviews(reviews)} reviews
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ProductCard({ product, onOptions, onAddToCart }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-white rounded-2xl border border-[#F1F5F9] overflow-hidden flex flex-col transition-all duration-300"
      style={{
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.10)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden bg-[#F8FAFC]" style={{ aspectRatio: "1 / 1" }}>

        {/* Skeleton shimmer while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#F1F5F9] via-[#E8EDF2] to-[#F1F5F9] animate-pulse" />
        )}

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* ── Top-left: category pill ── */}
        <div className="absolute top-3 left-3">
          <span
            className="bg-white/90 backdrop-blur-sm text-[#555] text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/50 shadow-sm"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {product.category}
          </span>
        </div>

        {/* ── Top-right: badge ── */}
        <div className="absolute top-3 right-3">
          <BadgePill badge={product.badge} />
        </div>

        {/* ── Hover quick-action overlay ── */}
        <div
          className="absolute bottom-3 left-3 right-3 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <button
            onClick={() => onOptions?.(product)}
            className="w-full bg-white/95 backdrop-blur-sm hover:bg-white text-[#111] text-[12px] font-semibold py-2 rounded-xl border border-white/60 shadow-md transition-all duration-150"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* ── Product info ── */}
      <div className="flex flex-col gap-2 p-4 flex-1">

        {/* Name */}
        <h3
          className="text-[15px] font-bold text-[#111] leading-snug"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <StarRating rating={product.rating} reviews={product.reviews} />

        {/* Price range */}
        <div
          className="text-[18px] font-black text-[#111] mt-1"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {priceRange(product.options)}
        </div>

        {/* ── Action buttons ── */}
        <div className="flex gap-2 mt-auto pt-3">

          {/* Add to Cart — outline */}
          <button
            onClick={() => onAddToCart?.(product)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-[#E5E7EB] hover:border-[#111] hover:bg-[#111] hover:text-white text-[#111] rounded-[9px] py-[10px] text-[12px] font-medium transition-all duration-200 group/btn"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <ShoppingCart size={13} strokeWidth={2} />
            Add to Cart
          </button>

          {/* Options — filled */}
          <button
            onClick={() => onOptions?.(product)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#111] hover:bg-[#333] active:scale-[0.97] text-white rounded-[9px] py-[10px] text-[12px] font-semibold transition-all duration-200"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <SlidersHorizontal size={13} strokeWidth={2} />
            Options
          </button>
        </div>
      </div>
    </article>
  );
}

// Export helpers so ProductGrid & FeaturedStrip can reuse them
export { priceRange, formatReviews, BadgePill, StarRating };