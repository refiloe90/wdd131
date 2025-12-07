document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  if (cartItems.length === 0) {
    cartItemsEl.textContent = "Your cart is empty.";
    cartTotalEl.textContent = "0";
    return;
  }

  let totalQty = 0;
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <strong>${item.name}</strong> (x${item.qty}) - R${(item.price * item.qty).toFixed(2)}
      <button data-index="${index}" class="remove-btn">Remove</button>
    `;
    cartItemsEl.appendChild(itemDiv);

    totalQty += item.qty;
    totalPrice += item.price * item.qty;
  });

  cartTotalEl.textContent = `${totalQty} items | Total: R${totalPrice.toFixed(2)}`;

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      const newCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
      localStorage.setItem('cartCount', newCount);

      location.reload();
    });
  });
});

