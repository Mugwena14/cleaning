import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

export default function Navbar({ cartCount = 0, onCartOpen, onSearchOpen, activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // ── Scroll shadow ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Close mobile drawer on desktop resize ──────────────────────────────────
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // ── IntersectionObserver — watch sections and update active nav link ───────
  useEffect(() => {
    // Only run on the Home page — About page manages its own state
    if (activePage !== "Home") {
      setActiveSection("About");
      return;
    }

    // Map section IDs → nav labels
    const sectionMap = {
      hero:    "Home",
      shop:    "Shop",
      footer:  "Contact",
    };

    const observers = [];

    Object.entries(sectionMap).forEach(([id, label]) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(label);
        },
        {
          // Fire when section occupies at least 20% of the viewport
          threshold: 0.2,
          // Shrink the top of the viewport by navbar height so #shop
          // doesn't trigger while still hidden behind the sticky nav
          rootMargin: "-64px 0px 0px 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [activePage]);

  // Derive the label that should be highlighted
  const highlightedLink = activePage === "About" ? "About" : activeSection;

  const handleNavClick = (link) => {
    setMobileOpen(false);
    onNavigate?.(link);
  };

  const navLinks = ["Home", "Shop", "About", "Contact"];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#F1F5F9]"
            : "bg-white/90 backdrop-blur-sm border-b border-black/5"
          }
        `}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNavClick("Home")}
            className="flex items-center gap-1 select-none bg-transparent border-none cursor-pointer p-0"
          >
            <span
              className="text-[22px] font-black tracking-tight text-[#111]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Clean<span className="text-[#111]/30">Hub</span>
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = highlightedLink === link;
              return (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`
                    relative text-[14px] font-medium tracking-[-0.1px]
                    transition-colors duration-200 bg-transparent border-none cursor-pointer p-0
                    after:absolute after:bottom-[-3px] after:left-0 after:h-[1.5px]
                    after:bg-[#111] after:transition-all after:duration-300
                    ${isActive
                      ? "text-[#111] after:w-full"
                      : "text-[#111]/50 hover:text-[#111] after:w-0 hover:after:w-full"
                    }
                  `}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {link}
                </button>
              );
            })}
          </nav>

          {/* ── Icons ── */}
          <div className="flex items-center gap-1">
            <button
              onClick={onSearchOpen}
              aria-label="Search"
              className="p-2 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC] transition-all duration-200"
            >
              <Search size={19} strokeWidth={1.8} />
            </button>
            <button
              aria-label="Wishlist"
              className="hidden sm:flex p-2 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC] transition-all duration-200"
            >
              <Heart size={19} strokeWidth={1.8} />
            </button>
            <button
              onClick={onCartOpen}
              aria-label="Cart"
              className="relative p-2 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC] transition-all duration-200"
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span
                  className="absolute top-1 right-1 bg-[#111] text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <button
              aria-label="Account"
              className="hidden sm:flex ml-1 items-center justify-center w-[34px] h-[34px] rounded-full bg-[#111] text-white hover:bg-[#333] transition-all duration-200"
            >
              <User size={15} strokeWidth={2} />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="flex md:hidden p-2 ml-1 rounded-lg text-[#111]/70 hover:bg-[#F8FAFC] transition-all duration-200"
            >
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-300
          ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`
            absolute inset-0 bg-black/30 backdrop-blur-sm
            transition-opacity duration-300
            ${mobileOpen ? "opacity-100" : "opacity-0"}
          `}
        />
        {/* Panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-[280px] bg-white
            flex flex-col pt-20 pb-8 px-6 shadow-2xl
            transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <nav className="flex flex-col gap-1 mb-8">
            {navLinks.map((link) => {
              const isActive = highlightedLink === link;
              return (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`
                    py-3 px-3 rounded-lg text-[15px] font-medium text-left
                    transition-colors duration-150 bg-transparent border-none cursor-pointer
                    ${isActive
                      ? "text-[#111] bg-[#F8FAFC]"
                      : "text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC]"
                    }
                  `}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {link}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={() => { onSearchOpen?.(); setMobileOpen(false); }}
              className="w-full flex items-center gap-3 py-3 px-3 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC] transition-colors duration-150 text-[14px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <Search size={17} strokeWidth={1.8} /> Search products
            </button>
            <button
              className="w-full flex items-center gap-3 py-3 px-3 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC] transition-colors duration-150 text-[14px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <Heart size={17} strokeWidth={1.8} /> Wishlist
            </button>
            <button
              className="w-full flex items-center gap-3 py-3 px-3 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#F8FAFC] transition-colors duration-150 text-[14px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <User size={17} strokeWidth={1.8} /> My Account
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}