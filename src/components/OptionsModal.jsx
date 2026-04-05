import { useState, useEffect } from "react";
import { X, Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { formatReviews } from "./ProductCard.jsx";

// ── Backdrop ──────────────────────────────────────────────────────────────────

function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[60]"
      style={{ animation: "fadeIn 0.2s ease" }}
    />
  );
}

// ── Star Rating (inline for modal) ────────────────────────────────────────────

function StarRow({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            strokeWidth={0}
            fill={i <= Math.round(rating) ? "#F59E0B" : "#E2E8F0"}
          />
        ))}
      </div>
      <span
        className="text-[12px] text-[#94A3B8]"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {rating} · {formatReviews(reviews)} reviews
      </span>
    </div>
  );
}

// ── Quantity Stepper ──────────────────────────────────────────────────────────

function QtyStepper({ qty, onChange }) {
  return (
    <div className="flex items-center border border-[#E5E7EB] rounded-[10px] overflow-hidden">
      <button
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="w-10 h-10 flex items-center justify-center text-[#111] hover:bg-[#F8FAFC] transition-colors duration-150 disabled:opacity-30"
        disabled={qty <= 1}
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <span
        className="w-10 text-center text-[14px] font-bold text-[#111] select-none"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {qty}
      </span>
      <button
        onClick={() => onChange(qty + 1)}
        className="w-10 h-10 flex items-center justify-center text-[#111] hover:bg-[#F8FAFC] transition-colors duration-150"
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function OptionsModal({ product, onClose, onAddToCart }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);

  // Reset state when product changes
  useEffect(() => {
    setSelectedIndex(0);
    setQty(1);
  }, [product?.id]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!product) return null;

  const selectedOption = product.options[selectedIndex];
  const total = selectedOption.price * qty;

  const handleAddToCart = () => {
    onAddToCart?.(product, selectedOption, qty);
    onClose?.();
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }
      `}</style>

      <Backdrop onClick={onClose} />

      {/* ── Modal panel ── */}
      <div
        className="fixed z-[70] inset-0 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto bg-white rounded-3xl w-full max-w-[480px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.22)]"
          style={{ animation: "slideUp 0.28s cubic-bezier(0.34,1.2,0.64,1)" }}
        >
          {/* ── Image header ── */}
          <div className="relative h-[220px] bg-[#F8FAFC] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient at bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Category pill — bottom left */}
            <div className="absolute bottom-3 left-4">
              <span
                className="bg-white/90 backdrop-blur-sm text-[#555] text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {product.category}
              </span>
            </div>

            {/* Close button — top right */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-sm transition-all duration-150"
            >
              <X size={15} strokeWidth={2.5} className="text-[#111]" />
            </button>
          </div>

          {/* ── Content ── */}
          <div className="p-6">

            {/* Name + stars */}
            <div className="mb-5">
              <h2
                className="text-[20px] font-black text-[#111] leading-tight mb-2"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {product.name}
              </h2>
              <StarRow rating={product.rating} reviews={product.reviews} />
            </div>

            {/* ── Option selector ── */}
            <div className="mb-6">
              <p
                className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[1px] mb-3"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Select Option
              </p>
              <div className="flex flex-wrap gap-2">
                {product.options.map((opt, i) => {
                  const isActive = selectedIndex === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      className={`
                        flex flex-col items-start px-4 py-2.5 rounded-xl border text-left
                        transition-all duration-150
                        ${isActive
                          ? "border-[#111] bg-[#111] text-white shadow-sm scale-[1.02]"
                          : "border-[#E5E7EB] bg-white text-[#111] hover:border-[#111]/40 hover:bg-[#FAFAFA]"
                        }
                      `}
                    >
                      <span
                        className="text-[13px] font-semibold leading-tight"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {opt.label}
                      </span>
                      <span
                        className={`text-[12px] mt-0.5 ${isActive ? "text-white/70" : "text-[#94A3B8]"}`}
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        R{opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Qty + Total row ── */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p
                  className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[1px] mb-2"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Quantity
                </p>
                <QtyStepper qty={qty} onChange={setQty} />
              </div>

              <div className="text-right">
                <p
                  className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[1px] mb-1"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Total
                </p>
                <p
                  className="text-[26px] font-black text-[#111] leading-none"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  R{total.toLocaleString()}
                </p>
                {qty > 1 && (
                  <p
                    className="text-[11px] text-[#94A3B8] mt-0.5"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    R{selectedOption.price} × {qty}
                  </p>
                )}
              </div>
            </div>

            {/* ── Add to Cart CTA ── */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2.5 bg-[#111] hover:bg-[#333] active:scale-[0.98] text-white rounded-[12px] py-4 text-[15px] font-bold transition-all duration-200"
              style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.2px" }}
            >
              <ShoppingCart size={17} strokeWidth={2} />
              Add to Cart — R{total.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}