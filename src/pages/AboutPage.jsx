import { ArrowRight, Leaf, Truck, ShieldCheck, Users, Star, Sparkles } from "lucide-react";

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[42px] font-black text-[#111] leading-none"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {value}
      </span>
      <span
        className="text-[13px] text-[#94A3B8]"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Value Card ────────────────────────────────────────────────────────────────

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center">
        <Icon size={18} strokeWidth={1.8} className="text-white" />
      </div>
      <div>
        <h3
          className="text-[16px] font-bold text-[#111] mb-1.5"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-[13px] text-[#6B7280] leading-relaxed"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Team Card ─────────────────────────────────────────────────────────────────

function TeamCard({ name, role, image }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F1F5F9]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p
          className="text-[15px] font-bold text-[#111]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {name}
        </p>
        <p
          className="text-[12px] text-[#94A3B8] mt-0.5"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────────────

function Testimonial({ quote, author, location }) {
  return (
    <div className="flex flex-col gap-4 p-6 bg-[#FAFAFA] rounded-2xl border border-[#F1F5F9]">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={13} strokeWidth={0} fill="#F59E0B" />
        ))}
      </div>
      <p
        className="text-[14px] text-[#374151] leading-relaxed italic"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        "{quote}"
      </p>
      <div>
        <p
          className="text-[13px] font-semibold text-[#111]"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {author}
        </p>
        <p
          className="text-[12px] text-[#94A3B8]"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {location}
        </p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AboutPage({ onShopNow }) {
  const values = [
    {
      icon: Leaf,
      title: "Eco-Conscious",
      description:
        "We stock products that are kind to your home and the planet — with biodegradable options across every category.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description:
        "Every product is vetted for performance. If it doesn't clean, it doesn't make the shelf — simple.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Same-day dispatch on orders before 2PM. Free delivery on orders over R500, anywhere in South Africa.",
    },
    {
      icon: Users,
      title: "Built for Everyone",
      description:
        "Whether you're a homeowner or a business — we have the right quantities, formats, and pricing for you.",
    },
  ];

  const team = [
    {
      name: "Lena Fourie",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    },
    {
      name: "James Nkosi",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    },
    {
      name: "Sara Dlamini",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    },
    {
      name: "Ruan Botha",
      role: "Logistics & Ops",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
  ];

  const testimonials = [
    {
      quote:
        "CleanHub has completely changed how I stock my office. The B2B pricing is unbeatable and delivery is always on time.",
      author: "Thandiwe M.",
      location: "Johannesburg",
    },
    {
      quote:
        "I love that I can find everything in one place — from bathroom to pool care. The options on each product make it easy to choose the right size.",
      author: "Pieter V.",
      location: "Cape Town",
    },
    {
      quote:
        "The sanitiser range is exceptional. Been a loyal customer for 2 years and the quality has never dropped.",
      author: "Nomsa K.",
      location: "Durban",
    },
  ];

  return (
    <div className="bg-[#FAFAFA]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#111] py-28 px-6">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto relative">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
              <Sparkles size={11} strokeWidth={2} className="text-white/50" />
            </div>
            <span
              className="text-[11px] font-semibold text-white/40 uppercase tracking-[2px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              About Us
            </span>
          </div>

          <h1
            className="text-[52px] md:text-[72px] font-black text-white leading-[1.0] mb-6 max-w-2xl"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            We make clean
            <span className="text-white/30"> simple.</span>
          </h1>

          <p
            className="text-[16px] text-white/50 leading-relaxed max-w-xl mb-10"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            CleanHub is South Africa's premium online cleaning supply store.
            We exist to give homes and businesses access to the best products —
            at honest prices, with real service.
          </p>

          <button
            onClick={onShopNow}
            className="flex items-center gap-2 bg-white hover:bg-white/90 active:scale-[0.98] text-[#111] rounded-full px-7 py-3.5 text-[14px] font-bold transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Shop Now
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-[#F1F5F9]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatCard value="15+" label="Product categories" />
            <StatCard value="200+" label="Products stocked" />
            <StatCard value="12k+" label="Happy customers" />
            <StatCard value="4.8★" label="Average rating" />
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#F1F5F9]">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-[#111] text-white rounded-2xl px-5 py-4 shadow-xl">
                <p
                  className="text-[28px] font-black leading-none"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  2019
                </p>
                <p
                  className="text-[11px] text-white/50 mt-1"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Founded
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <div>
                <p
                  className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[2px] mb-3"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Our Story
                </p>
                <h2
                  className="text-[36px] font-black text-[#111] leading-tight"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Started with a mop.
                  <br />
                  <span className="text-[#94A3B8]">Grew into a movement.</span>
                </h2>
              </div>
              <p
                className="text-[14px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                CleanHub started in 2019 when our founder Lena couldn't find a
                single place to buy quality cleaning supplies online in South Africa.
                What began as a small operation out of a Johannesburg garage has grown
                into a fully-fledged e-commerce platform serving thousands of
                households and businesses nationwide.
              </p>
              <p
                className="text-[14px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                We obsess over product quality, transparent pricing, and making sure
                every order arrives exactly when you need it. Cleaning shouldn't be
                complicated — and with CleanHub, it isn't.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F1F5F9]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80"
                    alt="Lena Fourie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-[13px] font-bold text-[#111]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Lena Fourie
                  </p>
                  <p
                    className="text-[11px] text-[#94A3B8]"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Founder & CEO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6 bg-white border-t border-[#F1F5F9]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <p
              className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[2px] mb-3"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              What We Stand For
            </p>
            <h2
              className="text-[36px] font-black text-[#111] leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <p
              className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[2px] mb-3"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              The People
            </p>
            <h2
              className="text-[36px] font-black text-[#111] leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Meet the team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 bg-white border-t border-[#F1F5F9]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <p
              className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[2px] mb-3"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Customer Love
            </p>
            <h2
              className="text-[36px] font-black text-[#111] leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              What people say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <Testimonial key={t.author} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[#111]">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2
            className="text-[40px] md:text-[52px] font-black text-white leading-tight mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Ready to get clean?
          </h2>
          <p
            className="text-[14px] text-white/50 mb-8 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Browse our full range of premium cleaning products and get
            delivered anywhere in South Africa.
          </p>
          <button
            onClick={onShopNow}
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90 active:scale-[0.98] text-[#111] rounded-full px-8 py-4 text-[15px] font-bold transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Browse All Products
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </section>
    </div>
  );
}