// Product data
const products = [
  {
    id: 1,
    name: "Black Coffee",
    price: 15.0,
    category: "coffee",
    image: "../images/black coffee.jpg",
  },
  {
    id: 2,
    name: "Boba Cheese Milk Tea",
    price: 20.0,
    category: "drinks",
    image: "../images/boba cheese milk tea.png",
  },
  {
    id: 3,
    name: "Americano",
    price: 23.0,
    category: "coffee",
    image: "../images/Americano.webp",
  },
  {
    id: 4,
    name: "Brown coffee",
    price: 14.0,
    category: "coffee",
    image: "../images/brown coffee.jpg",
  },
  {
    id: 5,
    name: "Da Lat coffee",
    price: 33.0,
    category: "coffee",
    image: "../images/dalat.jpg",
  },
  {
    id: 6,
    name: "Cold Brew Olong Peach",
    price: 24.0,
    category: "drinks",
    image: "../images/Cold Brew Oolong Peach.jpg",
  },
  {
    id: 7,
    name: "Cold Brew Olong Cheese",
    price: 27.0,
    category: "drinks",
    image: "../images/Cold Brew Olong Cheese.jpg",
  },
  {
    id: 8,
    name: "Cookies",
    price: 20.0,
    category: "food",
    image: "../images/Cookies.png",
  },
  {
    id: 9,
    name: "Cheese Cake",
    price: 22.0,
    category: "food",
    image: "../images/cheesecake.png",
  },
  {
    id: 10,
    name: "Chocolate Tart",
    price: 30.0,
    category: "food",
    image: "../images/Chocolate tart.png",
  },
  {
    id: 11,
    name: "Egg coffee",
    price: 34.0,
    category: "coffee",
    image: "../images/egg coffee.jpg",
  },
  {
    id: 12,
    name: "Espresso",
    price: 33.0,
    category: "coffee",
    image: "../images/espresso.jpg",
  },
  {
    id: 13,
    name: "Matcha Coco Latte",
    price: 30.0,
    category: "drinks",
    image: "../images/matcha coco latte.jpg",
  },
  {
    id: 14,
    name: "Flan Cake",
    price: 20.0,
    category: "food",
    image: "../images/flan cake.png",
  },
  {
    id: 15,
    name: "Milk coffee",
    price: 40.0,
    category: "coffee",
    image: "../images/milk coffee.jpg",
  },
  {
    id: 16,
    name: "Salt Coffee",
    price: 35.0,
    category: "coffee",
    image: "../images/salt coffee.jpg",
  },
  {
    id: 17,
    name: "Orange Coffee",
    price: 39.0,
    category: "coffee",
    image: "../images/orange coffee.jpg",
  },
  {
    id: 18,
    name: "Croissant",
    price: 15.0,
    category: "food",
    image: "../images/croissant .png",
  },
  {
    id: 19,
    name: "Cinnamon Roll",
    price: 19.0,
    category: "food",
    image: "../images/cinnamon_roll.png",
  },
  {
    id: 20,
    name: "Tropical Oolong",
    price: 20.0,
    category: "drinks",
    image: "../images/Tropical Oolong..jpg",
  },
  {
    id: 21,
    name: "Truffe coffee",
    price: 50.0,
    category: "coffee",
    image: "../images/truffe coffee.jpg",
  },
  {
    id: 22,
    name: "Coconut Milk coffee",
    price: 26.0,
    category: "coffee",
    image: "../images/coconut milk coffe.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsPerPage = 12; // Number of products per page
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
  // Proceed to Cart button
  document.getElementById("cart-btn").onclick = function () {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add some items before proceeding to the cart."
      );
    } else {
      window.location.href = "cart.html";
    }
  };

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
      cartItem.quantity--; // Giảm số lượng nếu số lượng lớn hơn 1
    } else {
      cart = cart.filter((item) => item.id !== productId); // Loại bỏ sản phẩm nếu số lượng là 1
    }
    updateCart(); // Cập nhật giỏ hàng sau khi xóa
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại giỏ hàng mới vào localStorage
}


// Proceed to Cart button
document.getElementById("cart-btn").onclick = function () {
  window.location.href = "cart.html";
};

window.onload = function () {
  displayProductsPage(1); // Hiển thị sản phẩm
  updateCart(); // Cập nhật giỏ hàng từ localStorage mà không thêm sản phẩm
};
