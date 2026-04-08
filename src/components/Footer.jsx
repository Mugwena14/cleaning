import { ArrowUpRight, ShieldCheck, Truck } from "lucide-react";

// ── Social Link ───────────────────────────────────────────────────────────────

function SocialLink({ href = "#", label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#94A3B8] hover:text-[#111] hover:border-[#111] hover:bg-[#F8FAFC] transition-all duration-200"
    >
      {children}
    </a>
  );
}

// ── Trust Badge ───────────────────────────────────────────────────────────────

function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-full px-3 py-1.5">
      <Icon size={12} strokeWidth={2} className="text-[#6B7280] shrink-0" />
      <span
        className="text-[11px] text-[#6B7280] font-medium"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Footer Link ───────────────────────────────────────────────────────────────

function FooterLink({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="block text-left text-[13px] text-[#94A3B8] hover:text-[#111] transition-colors duration-150 leading-none bg-transparent border-none cursor-pointer p-0"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {children}
    </button>
  );
}

// ── Footer Column ─────────────────────────────────────────────────────────────

function FooterCol({ title, links }) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-[13px] font-bold text-[#111] uppercase tracking-[1px]"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <FooterLink key={link.label} onClick={link.onClick}>
            {link.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Footer({ onNavigate }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const columns = [
    {
      title: "Shop",
      links: [
        { label: "All Products", onClick: () => { onNavigate?.("Shop"); } },
        { label: "New Arrivals",  onClick: () => { onNavigate?.("Shop"); } },
        { label: "On Sale",       onClick: () => { onNavigate?.("Shop"); } },
        { label: "Best Sellers",  onClick: () => { onNavigate?.("Shop"); } },
        { label: "Promo Items",   onClick: () => { onNavigate?.("Shop"); } },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ",           onClick: () => {} },
        { label: "Shipping Info", onClick: () => {} },
        { label: "Returns",       onClick: () => {} },
        { label: "Contact Us",    onClick: () => scrollTo("footer") },
        { label: "Track Order",   onClick: () => {} },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us",      onClick: () => { onNavigate?.("About"); } },
        { label: "Blog",          onClick: () => {} },
        { label: "Careers",       onClick: () => {} },
        { label: "B2B Wholesale", onClick: () => {} },
        { label: "Store Locator", onClick: () => {} },
      ],
    },
  ];

  const socials = [
    {
      label: "X / Twitter",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
    },
    {
      label: "Facebook",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      label: "Instagram",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      label: "LinkedIn",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  return (
    <footer className="bg-white border-t border-[#F1F5F9]">

      {/* ── Main body ── */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Logo */}
            <button
              onClick={() => onNavigate?.("Home")}
              className="inline-block text-left bg-transparent border-none cursor-pointer p-0"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#111", letterSpacing: "-0.5px" }}
            >
              ES<span style={{ opacity: 0.3 }}> SHOP</span>
            </button>

            {/* Tagline */}
            <p
              className="text-[14px] text-[#94A3B8] leading-relaxed max-w-[260px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Everything your space needs — cleaning supplies, hygiene
              products and more, delivered to your door.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ label, path }) => (
                <SocialLink key={label} label={label}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </SocialLink>
              ))}
            </div>

            {/* Trust badges — now icon-based */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <TrustBadge icon={ShieldCheck} label="Secure checkout" />
              <TrustBadge icon={Truck}       label="Fast delivery"   />
            </div>
          </div>

          {/* ── Link columns ── */}
          {columns.map((col) => (
            <FooterCol key={col.title} title={col.title} links={col.links} />
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#F1F5F9]">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p
            className="text-[12px] text-[#CBD5E1]"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            © {new Date().getFullYear()} ES Shop. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((label) => (
              <button
                key={label}
                className="text-[12px] text-[#CBD5E1] hover:text-[#94A3B8] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-[12px] text-[#CBD5E1] hover:text-[#111] transition-colors duration-150 group bg-transparent border-none cursor-pointer"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Back to top
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}