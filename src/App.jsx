import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import CategoryRail from "./components/CategoryRail.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import FeaturedStrip from "./components/FeaturedStrip.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import OptionsModal from "./components/OptionsModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import AboutPage from "./pages/AboutPage.jsx";

const App = () => {
  const [activePage, setActivePage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [optionsProduct, setOptionsProduct] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const handleNavigate = (link) => {
    if (link === "Home") {
      setActivePage("Home");
    } else if (link === "Shop") {
      setActivePage("Home");
      // Small delay to let Home mount then scroll
      setTimeout(() => {
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (link === "About") {
      setActivePage("About");
    } else if (link === "Contact") {
      setActivePage("Home");
      setTimeout(() => {
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchOpen(false);
    setActivePage("Home");
    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product, option, qty = 1) => {
    const selectedOption = option ?? product.options[0];
    setCart((prev) => {
      const existing = prev.findIndex(
        (i) => i.id === product.id && i.option === selectedOption.label
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], qty: next[existing].qty + qty };
        return next;
      }
      return [
        ...prev,
        { ...product, option: selectedOption.label, price: selectedOption.price, qty },
      ];
    });
  };

  const handleQtyChange = (idx, newQty) => {
    if (newQty < 1) { handleRemove(idx); return; }
    setCart((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], qty: newQty };
      return next;
    });
  };

  const handleRemove = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleReset = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  const navPage = activePage === "About" ? "About"
    : activePage === "Home" ? "Home"
    : "Home";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      <Navbar
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        activePage={navPage}
        onNavigate={handleNavigate}
      />

      {/* ── Page content ── */}
      {activePage === "About" ? (
        <AboutPage
          onShopNow={() => handleNavigate("Shop")}
        />
      ) : (
        <>
          <Hero onSearch={handleSearch} />
          <CategoryRail active={activeCategory} onChange={handleCategoryChange} />
          <ProductGrid
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onOptions={setOptionsProduct}
            onAddToCart={handleAddToCart}
            onClearSearch={() => setSearchQuery("")}
            onReset={handleReset}
          />
          <FeaturedStrip
            onOptions={setOptionsProduct}
            onAddToCart={handleAddToCart}
          />
          <Newsletter />
          <div id="footer">
            <Footer onNavigate={handleNavigate} />
          </div>
        </>
      )}

      {/* ── Overlays — always mounted ── */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
      />
      {optionsProduct && (
        <OptionsModal
          product={optionsProduct}
          onClose={() => setOptionsProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      <CartDrawer
        isOpen={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQtyChange={handleQtyChange}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default App;