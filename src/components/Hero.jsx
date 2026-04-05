import { useState } from "react";
import { Search } from "lucide-react";

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch?.(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a]" style={{ height: "80vh", minHeight: 520 }}>

      {/* ── Background Image ── */}
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85"
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        style={{ transition: "transform 8s ease", transformOrigin: "center" }}
        onLoad={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* ── Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* ── Editorial Headline ── */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
        {/* Eyebrow */}
        <p
          className="text-white/60 text-xs tracking-[4px] uppercase mb-4 font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Premium Cleaning Supplies
        </p>

        {/* Big display text */}
        <h1
          className="text-white font-black leading-[0.88] select-none pointer-events-none"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(72px, 17vw, 190px)",
            mixBlendMode: "overlay",
            opacity: 0.95,
          }}
        >
          Clean.
        </h1>

        {/* Subtext */}
        <p
          className="text-white/55 text-[15px] mt-6 max-w-sm leading-relaxed"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Everything your space needs — delivered to your door.
        </p>
      </div>

      {/* ── Search Bar — anchored to bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 md:px-10 py-5">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3">

          {/* Input wrapper */}
          <div className="flex-1 flex items-center gap-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[10px] px-4 focus-within:border-[#111] focus-within:shadow-[0_0_0_3px_rgba(17,17,17,0.06)] transition-all duration-200">
            <Search size={16} strokeWidth={1.8} className="text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products, categories…"
              className="flex-1 bg-transparent border-none outline-none py-[14px] text-[14px] text-[#111] placeholder:text-[#9CA3AF]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            />
            {/* Clear button */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[#9CA3AF] hover:text-[#111] transition-colors duration-150 shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="shrink-0 bg-[#111] hover:bg-[#333] active:scale-[0.98] text-white rounded-[10px] px-6 md:px-8 py-[14px] text-[14px] font-bold transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.2px" }}
          >
            Search
          </button>
        </div>

        {/* Quick search chips */}
        <div className="max-w-[1280px] mx-auto mt-3 flex items-center gap-2 flex-wrap">
          <span
            className="text-[11px] text-[#9CA3AF] mr-1"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Popular:
          </span>
          {["Sanitisers", "Floor Mops", "Nitrile Gloves", "Car Wash", "Pool Shock"].map((term) => (
            <button
              key={term}
              onClick={() => { setQuery(term); onSearch?.(term); }}
              className="text-[11px] text-[#6B7280] hover:text-[#111] bg-[#F1F5F9] hover:bg-[#E5E7EB] rounded-full px-3 py-1 transition-all duration-150"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
