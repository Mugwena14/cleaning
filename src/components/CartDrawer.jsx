import { useEffect } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyCart({ onClose }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] flex items-center justify-center">
        <ShoppingBag size={26} strokeWidth={1.5} className="text-[#94A3B8]" />
      </div>
      <div>
        <p
          className="text-[16px] font-bold text-[#111] mb-1"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Your cart is empty
        </p>
        <p
          className="text-[13px] text-[#94A3B8] leading-relaxed"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Add some products to get started
        </p>
      </div>
      <button
        onClick={onClose}
        className="mt-2 flex items-center gap-2 bg-[#111] hover:bg-[#333] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        Continue Shopping
        <ArrowRight size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

// ── Cart Item ─────────────────────────────────────────────────────────────────

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="flex gap-3 p-3 rounded-2xl bg-[#FAFAFA] border border-[#F1F5F9]">

      {/* Product image */}
      <div className="w-[64px] h-[64px] rounded-xl overflow-hidden bg-[#F1F5F9] shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-bold text-[#111] leading-snug truncate"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {item.name}
        </p>
        <p
          className="text-[11px] text-[#94A3B8] mt-0.5 mb-2"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {item.option} · R{item.price} each
        </p>

        {/* Qty controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(item, item.qty - 1)}
            disabled={item.qty <= 1}
            className="w-6 h-6 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-center text-[#111] hover:border-[#111] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            <Minus size={10} strokeWidth={2.5} />
          </button>
          <span
            className="text-[13px] font-bold text-[#111] w-5 text-center"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {item.qty}
          </span>
          <button
            onClick={() => onQtyChange(item, item.qty + 1)}
            className="w-6 h-6 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-center text-[#111] hover:border-[#111] transition-all duration-150"
          >
            <Plus size={10} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Price + remove */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <p
          className="text-[14px] font-black text-[#111]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          R{(item.price * item.qty).toLocaleString()}
        </p>
        <button
          onClick={() => onRemove(item)}
          className="text-[#D1D5DB] hover:text-[#EF4444] transition-colors duration-150"
        >
          <Trash2 size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// ── Order Summary ─────────────────────────────────────────────────────────────

function OrderSummary({ subtotal }) {
  const FREE_DELIVERY_THRESHOLD = 500;
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const qualifies = subtotal >= FREE_DELIVERY_THRESHOLD;

  return (
    <div className="space-y-3">
      {/* Free delivery progress */}
      <div className="bg-[#F8FAFC] rounded-xl p-3">
        <div className="flex justify-between items-center mb-1.5">
          <p
            className="text-[12px] font-medium text-[#374151]"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {qualifies
              ? "🎉 You qualify for free delivery!"
              : `Add R${remaining} more for free delivery`}
          </p>
        </div>
        <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#111] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-2 text-[13px]" style={{ fontFamily: "DM Sans, sans-serif" }}>
        <div className="flex justify-between text-[#6B7280]">
          <span>Subtotal</span>
          <span>R{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[#6B7280]">
          <span>Delivery</span>
          <span className={qualifies ? "text-[#16A34A] font-medium" : ""}>
            {qualifies ? "Free" : "Calculated at checkout"}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline border-t border-[#F1F5F9] pt-3">
        <span
          className="text-[14px] font-semibold text-[#111]"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Total
        </span>
        <span
          className="text-[22px] font-black text-[#111]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          R{subtotal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CartDrawer({ isOpen, items = [], onClose, onQtyChange, onRemove }) {

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Drawer panel ── */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 z-[70]
          w-full max-w-[400px] bg-white
          flex flex-col
          shadow-[-8px_0_40px_rgba(0,0,0,0.10)]
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <h2
              className="text-[18px] font-black text-[#111]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Cart
            </h2>
            {totalQty > 0 && (
              <span
                className="bg-[#111] text-white text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {totalQty}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E5E7EB] flex items-center justify-center transition-colors duration-150"
          >
            <X size={15} strokeWidth={2.5} className="text-[#111]" />
          </button>
        </div>

        {/* ── Body ── */}
        {items.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item, idx) => (
                <CartItem
                  key={`${item.id}-${item.option}-${idx}`}
                  item={item}
                  onQtyChange={(item, newQty) => onQtyChange?.(idx, newQty)}
                  onRemove={() => onRemove?.(idx)}
                />
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="px-5 py-5 border-t border-[#F1F5F9] space-y-4">
              <OrderSummary subtotal={subtotal} />

              <button
                className="w-full flex items-center justify-center gap-2 bg-[#111] hover:bg-[#333] active:scale-[0.98] text-white rounded-[12px] py-4 text-[15px] font-bold transition-all duration-200"
                style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.2px" }}
              >
                Checkout
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>

              <button
                onClick={onClose}
                className="w-full text-[13px] text-[#94A3B8] hover:text-[#111] transition-colors duration-150"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}