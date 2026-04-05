import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  "All",
  "Promo Items",
  "Automotive Care",
  "Bathroom",
  "Dispensers",
  "Floor",
  "Garden",
  "Home Care",
  "Kitchen",
  "Outdoor",
  "Paper",
  "Personal Care",
  "Pest Control",
  "Pets",
  "Pool Care",
  "PPE & Safety",
  "Sanitisers",
];

export default function CategoryRail({ active = "All", onChange }) {
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrow buttons
  const checkScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Scroll active chip into view when category changes
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const activeChip = el.querySelector("[data-active='true']");
    if (activeChip) {
      activeChip.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }, [active]);

  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1280px] mx-auto px-6 relative flex items-center">

        {/* ── Left fade + arrow ── */}
        <div
          className={`
            absolute left-0 top-0 bottom-0 flex items-center z-10
            pl-2 pr-8 pointer-events-none
            bg-gradient-to-r from-white via-white/90 to-transparent
            transition-opacity duration-200
            ${canScrollLeft ? "opacity-100" : "opacity-0"}
          `}
        >
          <button
            onClick={() => scroll(-1)}
            className="pointer-events-auto w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-[#555] hover:text-[#111] hover:border-[#111] transition-all duration-150"
          >
            <ChevronLeft size={14} strokeWidth={2} />
          </button>
        </div>

        {/* ── Scrollable chip row ── */}
        <div
          ref={railRef}
          className="flex items-center gap-2 overflow-x-auto py-3 w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`.category-rail::-webkit-scrollbar { display: none; }`}</style>

          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                data-active={isActive}
                onClick={() => onChange?.(cat)}
                className={`
                  shrink-0 whitespace-nowrap rounded-full px-[18px] py-[7px]
                  text-[13px] font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#111] text-white border border-[#111] shadow-sm scale-[1.02]"
                      : "bg-transparent text-[#555] border border-[#E5E7EB] hover:border-[#111]/30 hover:text-[#111] hover:bg-[#FAFAFA]"
                  }
                `}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Right fade + arrow ── */}
        <div
          className={`
            absolute right-0 top-0 bottom-0 flex items-center z-10
            pr-2 pl-8 pointer-events-none
            bg-gradient-to-l from-white via-white/90 to-transparent
            transition-opacity duration-200
            ${canScrollRight ? "opacity-100" : "opacity-0"}
          `}
        >
          <button
            onClick={() => scroll(1)}
            className="pointer-events-auto w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-[#555] hover:text-[#111] hover:border-[#111] transition-all duration-150"
          >
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export { CATEGORIES };
