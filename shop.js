// Product data
const products = [
  {
    id: 1,
    name: "White Coffee",
    price: 15.0,
    category: "coffee",
    image: "images/white coffee.png",
  },
  {
    id: 2,
    name: "Salt Coffee",
    price: 20.0,
    category: "coffee",
    image: "images/salt_coffee.png",
  },
  {
    id: 3,
    name: "Mocha",
    price: 23.0,
    category: "coffee",
    image: "images/mocha.png",
  },
  {
    id: 4,
    name: "Mint Tea",
    price: 14.0,
    category: "drinks",
    image: "images/mint_tea.png",
  },
  {
    id: 5,
    name: "Milk Coffee",
    price: 33.0,
    category: "coffee",
    image: "images/milk_coffee.png",
  },
  {
    id: 6,
    name: "Matcha Tea Macchiato",
    price: 24.0,
    category: "drinks",
    image: "images/matcha tea Macchiato.png",
  },
  {
    id: 7,
    name: "Matcha Latte",
    price: 27.0,
    category: "drinks",
    image: "images/matcha latte.png",
  },
  {
    id: 8,
    name: "Cookies",
    price: 20.0,
    category: "food",
    image: "images/Cookies.png",
  },
  {
    id: 9,
    name: "Cheese Cake",
    price: 22.0,
    category: "food",
    image: "images/cheesecake.png",
  },
  {
    id: 10,
    name: "Chocolate Tart",
    price: 30.0,
    category: "food",
    image: "images/Chocolate tart.png",
  },
  {
    id: 11,
    name: "Mango Macchiato",
    price: 34.0,
    category: "drinks",
    image: "images/mango macchiato.png",
  },
  {
    id: 12,
    name: "Hot Chocolate",
    price: 33.0,
    category: "drinks",
    image: "images/hot_chocolate.png",
  },
  {
    id: 13,
    name: "Green Tea",
    price: 30.0,
    category: "drinks",
    image: "images/green_tea.png",
  },
  {
    id: 14,
    name: "Flan Cake",
    price: 20.0,
    category: "food",
    image: "images/flan cake.png",
  },
  {
    id: 15,
    name: "Espresso",
    price: 40.0,
    category: "coffee",
    image: "images/espresso.png",
  },
  {
    id: 16,
    name: "Egg Coffee",
    price: 35.0,
    category: "coffee",
    image: "images/egg coffee.png",
  },
  {
    id: 17,
    name: "Coconut Milk Coffee",
    price: 39.0,
    category: "coffee",
    image: "images/coconut milk coffee.png",
  },
  {
    id: 18,
    name: "Croissant",
    price: 15.0,
    category: "food",
    image: "images/croissant.png",
  },
  {
    id: 19,
    name: "Cinnamon Roll",
    price: 19.0,
    category: "food",
    image: "images/cinnamon_roll.png",
  },
  {
    id: 20,
    name: "Chrysanthemum Tea",
    price: 50.0,
    category: "drinks",
    image: "images/chrysanthemum tea.png",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsPerPage = 10; // Number of products per page
let currentPage = 1; // Current page

// Update cart function
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = cart
    .map(
      (item) => `
              <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${
                  item.id
                })"class="remove-item"">&times;</button>
              </div>
            `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart function
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();

  showNotification(`${product.name} has been added to the cart!`);
  const cartSection = document.getElementById("cart-toggle");
  cartSection.scrollIntoView({ behavior: "smooth" });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Display products on the page
function displayProducts(productList = products) {
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = productList
    .map(
      (product) => `
              <div class="product-card">
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image" />
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${
                  product.id
                })">Add to Cart</button>
              </div>
            `
    )
    .join("");
}
// Lắng nghe sự kiện click trên các danh mục
document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    filterProducts(category);
  });
});

// Filter products by category
function filterProducts(category) {
  if (category === "all") {
    displayProducts(products); // Hiển thị tất cả sản phẩm nếu chọn "all"
  } else {
    const filteredProducts = products.filter(
      (product) => product.category === category // Lọc theo danh mục
    );
    displayProducts(filteredProducts);
  }
}

// Sort products
function sortProducts(order) {
  let sortedProducts = [...products];
  if (order === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (order === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (order === "name") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  displayProducts(sortedProducts);
}

// Search products
function searchProducts(query) {
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  displayProducts(searchedProducts);
}

// Pagination handling
function changePage(page) {
  currentPage = page;
  displayProductsPage(currentPage);
}

function nextPage() {
  currentPage++;
  displayProductsPage(currentPage);
}

function displayProductsPage(page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  displayProducts(paginatedProducts);
}

// Update cart function
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // If cart is empty, show an empty message
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  // Otherwise, display the cart items
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image" />
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
             <button class="remove-item" onclick="removeFromCart(${
               item.id
             })">&times;</button>
          </div>
        `
    )
    .join("");

  // Calculate and update the total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove from cart function
function removeFromCart(productId) {
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--; // Decrease quantity if more than 1
    } else {
      cart = cart.filter((item) => item.id !== productId); // Remove item if quantity is 1
    }
    updateCart(); // Update the cart after removal
  }
}

// Proceed to Cart button
document.getElementById("cart-btn").onclick = function () {
  window.location.href = "cart.html";
};

// Initialize on page load
window.onload = function () {
  displayProductsPage(1); // Assuming a product display function exists
  updateCart(); // Update the cart on page load
};
