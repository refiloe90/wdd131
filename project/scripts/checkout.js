document.addEventListener("DOMContentLoaded", () => {
  const summaryItemsEl = document.getElementById("summary-items");
  const summaryTotalEl = document.getElementById("summary-total");
  const checkoutForm = document.querySelector(".checkout-form");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    summaryItemsEl.textContent = "Your cart is empty.";
    summaryTotalEl.textContent = "";
    return;
  }

  const grouped = {};
  cartItems.forEach(item => {
    if (grouped[item.name]) {
      grouped[item.name].qty += item.qty;
    } else {
      grouped[item.name] = { ...item };
    }
  });

  let totalQty = 0;
  let totalPrice = 0;

  Object.values(grouped).forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.textContent = `${item.name} (x${item.qty}) - R${(item.price * item.qty).toFixed(2)}`;
    summaryItemsEl.appendChild(div);

    totalQty += item.qty;
    totalPrice += item.price * item.qty;
  });

  summaryTotalEl.textContent = `Total: ${totalQty} items | R${totalPrice.toFixed(2)}`;

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      alert("✅ Thank you, your order has been placed!");

      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");

      window.location.href = "final-project.html";
    });
  }

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");
      summaryItemsEl.textContent = "Your cart is empty.";
      summaryTotalEl.textContent = "";
      alert("🗑 Cart cleared!");
    });
  }
});


