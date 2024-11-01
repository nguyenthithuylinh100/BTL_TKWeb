// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart display and total
function updateCart() {
  const cartItems = document.getElementById("cart-items");

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <input type="checkbox" class="cart-item-select" 
                 data-id="${item.id}" onchange="updateTotal()" />
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <span class="cart-item-title">${item.name}</span>
          <div class="cart-item-quantity">
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <input type="number" value="${item.quantity}" 
                   onchange="updateQuantity(${item.id}, this.value)" min="1" />
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-item" onclick="removeFromCart(${item.id})">
            &times;
          </button>
        </div>`
    )
    .join("");

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotal();
}

// Update the total price and product count
function updateTotal() {
  const checkboxes = document.querySelectorAll(".cart-item-select");
  let total = 0;
  let totalCount = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const itemId = parseInt(checkbox.dataset.id);
      const cartItem = cart.find((item) => item.id === itemId);
      if (cartItem) {
        total += cartItem.price * cartItem.quantity;
        totalCount += cartItem.quantity;
      }
    }
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);
  localStorage.setItem("checkoutTotal", total.toFixed(2));
  localStorage.setItem("totalProducts", totalCount);
}

// Change the quantity of an item
function changeQuantity(productId, change) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = Math.max(1, cartItem.quantity + change); // Ensure quantity >= 1
    updateCart();
  }
}

// Update quantity directly from input
function updateQuantity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.id === productId);
  const quantity = parseInt(newQuantity, 10);
  if (cartItem && quantity > 0) {
    cartItem.quantity = quantity;
    updateCart();
  }
}

// Remove an item from the cart
function removeFromCart(productId) {
  // Remove the product from the cart
  cart = cart.filter((item) => item.id !== productId);

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart display
  updateCart();
}

// Toggle Select All checkbox
function toggleSelectAll(selectAllCheckbox) {
  const checkboxes = document.querySelectorAll(".cart-item-select");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });
  updateTotal();
}

// Proceed to checkout
document.getElementById("checkout-btn").onclick = function () {
  const selectedItems = cart.filter((item) => {
    const checkbox = document.querySelector(
      `.cart-item-select[data-id='${item.id}']`
    );
    return checkbox && checkbox.checked;
  });

  // Save selected items to localStorage
  localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));

  // Redirect to checkout page
  window.location.href = "checkout.html";
};

// Initialize the cart on page load
window.onload = updateCart;
