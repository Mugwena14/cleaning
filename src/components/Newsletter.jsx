import { useState } from "react";
import { ArrowRight, CheckCircle2, Tag, PackageSearch, Lightbulb, Sparkles } from "lucide-react";

// ── Perk Pill ─────────────────────────────────────────────────────────────────

function Perk({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-full px-3.5 py-1.5 transition-colors duration-200">
      <Icon size={13} strokeWidth={2} className="text-white/60 shrink-0" />
      <span
        className="text-[12px] text-white/70 font-medium"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = () => {
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      setStatus("error");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    setTimeout(() => setStatus("success"), 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const perks = [
    { icon: Tag,           label: "Exclusive deals"  },
    { icon: PackageSearch, label: "Restock alerts"   },
    { icon: Lightbulb,     label: "Cleaning tips"    },
  ];

  return (
    <section className="bg-[#111] py-20 px-6 overflow-hidden relative">

      {/* ── Subtle dot texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Glow blobs ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

          {/* ── Left: Copy ── */}
          <div className="flex-1 max-w-lg text-center lg:text-left">

            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-5">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
                <Sparkles size={11} strokeWidth={2} className="text-white/50" />
              </div>
              <span
                className="text-[11px] font-semibold text-white/40 uppercase tracking-[2px]"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Newsletter
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-[36px] md:text-[44px] font-black text-white leading-[1.05] mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Stay stocked.
              <br />
              <span className="text-white/40">Stay fresh.</span>
            </h2>

            {/* Body */}
            <p
              className="text-[14px] text-white/50 leading-relaxed mb-7"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Get exclusive deals, early restocks, and cleaning tips
              delivered straight to your inbox. No spam — ever.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {perks.map(({ icon, label }) => (
                <Perk key={label} icon={icon} label={label} />
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="flex-1 w-full max-w-md">
            {status === "success" ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <CheckCircle2 size={28} strokeWidth={1.5} className="text-[#86EFAC]" />
                </div>
                <div>
                  <p
                    className="text-[20px] font-black text-white mb-1"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    You're in!
                  </p>
                  <p
                    className="text-[13px] text-white/50"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Watch your inbox for deals and updates.
                  </p>
                </div>
              </div>
            ) : (
              /* ── Input form ── */
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p
                  className="text-[13px] font-semibold text-white/60 mb-4"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Enter your email to subscribe
                </p>

                {/* Email input */}
                <div
                  className={`
                    flex items-center bg-white/10 border rounded-[10px] px-4 mb-3
                    transition-all duration-200
                    focus-within:bg-white/15 focus-within:border-white/30
                    ${status === "error" ? "border-red-400/50" : "border-white/15"}
                  `}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent border-none outline-none py-3.5 text-[14px] text-white placeholder:text-white/30"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>

                {/* Error message */}
                {status === "error" && errorMsg && (
                  <p
                    className="text-[12px] text-red-400 mb-3 px-1"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {errorMsg}
                  </p>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-white/90 active:scale-[0.98] text-[#111] rounded-[10px] py-3.5 text-[14px] font-bold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Subscribing…
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {/* Fine print */}
                <p
                  className="text-[11px] text-white/25 text-center mt-3 leading-relaxed"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  By subscribing, you agree to our Privacy Policy.
                  Unsubscribe anytime.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}