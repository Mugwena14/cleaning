import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data/Products.js";

const QUICK_SEARCHES = ["Sanitisers", "Floor Mops", "Nitrile Gloves", "Car Wash", "Pool Shock"];

// ── Quick Result Item ─────────────────────────────────────────────────────────

function ResultItem({ product, onClick }) {
  return (
    <button
      onClick={() => onClick(product.name)}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] rounded-xl transition-colors duration-150 text-left group"
    >
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F1F5F9] shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-semibold text-[#111] truncate"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {product.name}
        </p>
        <p
          className="text-[11px] text-[#94A3B8]"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {product.category}
        </p>
      </div>
      <ArrowRight
        size={14}
        strokeWidth={2}
        className="text-[#D1D5DB] group-hover:text-[#111] transition-colors duration-150 shrink-0"
      />
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SearchOverlay({ isOpen, onClose, onSearch }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSearch = (term) => {
    const q = term || query;
    if (!q.trim()) return;
    onSearch?.(q.trim());
    onClose?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Live results — top 5 matches
  const results = query.trim().length > 0
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-[80] bg-black/50 backdrop-blur-[4px]
          transition-opacity duration-250
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Panel ── */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-[90]
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
        `}
      >
        <div className="bg-white border-b border-[#F1F5F9] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
          <div className="max-w-[680px] mx-auto px-4 py-4">

            {/* ── Input row ── */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 bg-[#F8FAFC] border border-[#E5E7EB] focus-within:border-[#111] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(17,17,17,0.06)] rounded-[10px] px-4 transition-all duration-200">
                <Search size={16} strokeWidth={1.8} className="text-[#9CA3AF] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, categories…"
                  className="flex-1 bg-transparent border-none outline-none py-3.5 text-[15px] text-[#111] placeholder:text-[#9CA3AF]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-[#9CA3AF] hover:text-[#111] transition-colors">
                    <X size={15} strokeWidth={2} />
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 text-[13px] font-medium text-[#94A3B8] hover:text-[#111] transition-colors duration-150 px-2"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Cancel
              </button>
            </div>

            {/* ── Live results ── */}
            {results.length > 0 && (
              <div className="mt-3 -mx-1">
                <p
                  className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[1.5px] px-4 mb-1"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Products
                </p>
                {results.map((p) => (
                  <ResultItem key={p.id} product={p} onClick={handleSearch} />
                ))}
              </div>
            )}

            {/* ── Quick searches (shown when input is empty) ── */}
            {!query && (
              <div className="mt-4 pb-1">
                <p
                  className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-[1.5px] mb-2.5"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="flex items-center gap-1.5 text-[12px] text-[#555] bg-[#F1F5F9] hover:bg-[#111] hover:text-white rounded-full px-3.5 py-1.5 transition-all duration-150"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      <Search size={11} strokeWidth={2} />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── No results ── */}
            {query.trim().length > 0 && results.length === 0 && (
              <div className="py-6 text-center">
                <p
                  className="text-[14px] text-[#94A3B8]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  No products found for "<span className="text-[#111] font-medium">{query}</span>"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}