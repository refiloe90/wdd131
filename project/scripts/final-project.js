document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("currentyear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const modifiedEl = document.getElementById("lastmodified");
  if (modifiedEl) {
    modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  const cartCount = document.getElementById("cart-count");
  const buttons = document.querySelectorAll(".add-to-cart");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const savedCount = localStorage.getItem("cartCount");
  if (cartCount && savedCount) {
    cartCount.textContent = savedCount;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const qtyInput = card.querySelector('input[type="number"]');
      const qty = qtyInput ? Number(qtyInput.value) || 1 : 1;

      const nameEl = card.querySelector("h3") || card.querySelector("img");
      const name =
        nameEl?.tagName === "IMG"
          ? nameEl.alt
          : nameEl?.textContent.trim() || "Unnamed Product";

      const priceText = card
        .querySelector(".price")
        ?.textContent.replace("R", "")
        .trim();
      const price = parseFloat(priceText) || 0;

      if (!name || isNaN(price) || price <= 0) {
        console.warn(`Invalid product data: ${name}, R${price}`);
        return;
      }

      const existingItem = cartItems.find((item) => item.name === name);
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cartItems.push({ name, price, qty });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      const newCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
      if (cartCount) {
        cartCount.textContent = newCount;
      }
      localStorage.setItem("cartCount", newCount);

      if (qtyInput) qtyInput.value = 1;

      cartCount.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.2)" },
          { transform: "scale(1)" },
        ],
        { duration: 200 }
      );
    });
  });
});




