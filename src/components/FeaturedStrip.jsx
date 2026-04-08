import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard.jsx";
import { PRODUCTS } from "../data/Products.js";

// ── Arrow Button ──────────────────────────────────────────────────────────────

function ArrowBtn({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-10 h-10 rounded-full border flex items-center justify-center
        transition-all duration-200
        ${disabled
          ? "border-[#E5E7EB] text-[#D1D5DB] cursor-not-allowed"
          : "border-[#E5E7EB] text-[#111] hover:bg-[#111] hover:text-white hover:border-[#111]"
        }
      `}
    >
      <Icon size={16} strokeWidth={2} />
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function FeaturedStrip({ onOptions, onAddToCart }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Products to feature — anything with a badge
  const featured = PRODUCTS.filter((p) => p.badge === "new" || p.badge === "sale");

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 border-t border-[#F1F5F9]">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Section header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Accent icon */}
            {/* <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center">
              <Sparkles size={15} strokeWidth={2} className="text-white" />
            </div> */}
            <div>
              <h2
                className="text-[24px] font-black text-[#111] leading-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Top Picks
              </h2>
              <p
                className="text-[12px] text-[#94A3B8] mt-0.5"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                New arrivals & bestsellers
              </p>
            </div>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-2">
            <ArrowBtn
              direction="left"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
            />
            <ArrowBtn
              direction="right"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
            />
          </div>
        </div>

        {/* ── Scrollable strip ── */}
        <div className="relative">
          {/* Left fade */}
          <div
            className={`
              absolute left-0 top-0 bottom-0 w-16 z-10
              bg-gradient-to-r from-white to-transparent
              pointer-events-none transition-opacity duration-200
              ${canScrollLeft ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* Cards row */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .featured-strip::-webkit-scrollbar { display: none; }
            `}</style>

            {featured.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[260px]"
              >
                <ProductCard
                  product={product}
                  onOptions={onOptions}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>

          {/* Right fade */}
          <div
            className={`
              absolute right-0 top-0 bottom-0 w-16 z-10
              bg-gradient-to-l from-white to-transparent
              pointer-events-none transition-opacity duration-200
              ${canScrollRight ? "opacity-100" : "opacity-0"}
            `}
          />
        </div>

        {/* ── View all link ── */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 text-[13px] font-semibold text-[#111] border border-[#E5E7EB] hover:border-[#111] hover:bg-[#111] hover:text-white rounded-full px-6 py-2.5 transition-all duration-200"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            View all products
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}