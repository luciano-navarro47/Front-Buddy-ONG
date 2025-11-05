// src/utils/cart.js
export function normalizeCartItem(p) {
    const unit_price = Number(p.unit_price ?? p.price ?? 0);
    const quantity = Number(p.quantity ?? p.amount ?? 0);
    const stock = Number(p.stock ?? 0);
    const picture_url =
      (Array.isArray(p.images) && p.images.length > 0 && p.images[0]) ||
      p.picture_url ||
      p.image ||
      undefined;
  
    const computedTotal = Number.isFinite(Number(p.total))
      ? Number(p.total)
      : unit_price * quantity;
    const total = Number.isFinite(computedTotal)
      ? Math.round(computedTotal * 100) / 100
      : 0;
  
    return {
      id: String(p.id),
      name: String(p.name ?? ""),
      unit_price: Number.isFinite(unit_price) ? unit_price : 0,
      quantity: Number.isFinite(quantity) ? quantity : 0,
      stock,
      picture_url,
      total,
    };
  }
  
  export function readInitialCart() {
    try {
      const raw = window.localStorage.getItem("cart");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed.map(normalizeCartItem) : [];
      try {
        window.localStorage.setItem("cart", JSON.stringify(arr));
      } catch (e) {}
      return arr;
    } catch (err) {
      console.error("Error parsing cart from localStorage:", err);
      return [];
    }
  }
  