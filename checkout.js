// Fetch city, district, and ward data
var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");

axios
  .get(
    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
  )
  .then(function (response) {
    const data = response.data;
    renderCity(data);
  })
  .catch(function (error) {
    console.error("Error fetching data:", error);
  });

function renderCity(data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("No city data found");
    return;
  }

  // Populate city dropdown
  data.forEach(function (city) {
    var opt = document.createElement("option");
    opt.value = city.Id;
    opt.text = city.Name;
    citis.appendChild(opt);
  });

  // Handle city change
  citis.addEventListener("change", function () {
    districts.length = 1;
    wards.length = 1;
    const selectedCityId = this.value;

    if (selectedCityId) {
      const cityData = data.find((n) => n.Id == selectedCityId);
      if (cityData && cityData.Districts) {
        cityData.Districts.forEach(function (district) {
          var opt = document.createElement("option");
          opt.value = district.Id;
          opt.text = district.Name;
          districts.appendChild(opt);
        });
      }
    }
  });

  // Handle district change
  districts.addEventListener("change", function () {
    wards.length = 1;
    const selectedDistrictId = this.value;
    const selectedCityId = citis.value;
    const cityData = data.find((n) => n.Id == selectedCityId);

    if (cityData) {
      const districtData = cityData.Districts.find(
        (n) => n.Id == selectedDistrictId
      );
      if (districtData && districtData.Wards) {
        districtData.Wards.forEach(function (ward) {
          var opt = document.createElement("option");
          opt.value = ward.Id;
          opt.text = ward.Name;
          wards.appendChild(opt);
        });
      }
    }
  });
}

// Form validation function
function validateForm() {
  // Get form values
  const username = document.getElementById("username").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const city = document.getElementById("city").value;
  const district = document.getElementById("district").value;
  const ward = document.getElementById("ward").value;
  const address = document.getElementById("address").value.trim();
  const deliveryLater = document.getElementById("later").checked;
  const deliveryTime = document.getElementById("delivery-time").value;
  const paymentMethod = document.getElementById("payment-method").value;

  // Collect error messages
  let errorMessage = "";

  // Basic validations and error message collection
  if (!username) {
    errorMessage += "• Please enter your full name.\n";
  }

  if (!phone || !/^\d{10,15}$/.test(phone)) {
    errorMessage += "• Please enter a valid phone number (10-15 digits).\n";
  }

  if (!city) {
    errorMessage += "• Please select a city.\n";
  }

  if (!district) {
    errorMessage += "• Please select a district.\n";
  }

  if (!ward) {
    errorMessage += "• Please select a ward.\n";
  }

  if (!address) {
    errorMessage += "• Please enter your street address.\n";
  }

  // If 'Schedule Delivery' is selected, check for delivery time
  if (deliveryLater && !deliveryTime) {
    errorMessage += "• Please select a delivery time.\n";
  }

  // Ensure a payment method is selected
  if (!paymentMethod) {
    errorMessage += "• Please select a payment method.\n";
  }

  // If there are errors, display them once
  if (errorMessage) {
    alert("Please fix the following errors:\n" + errorMessage);
    return false; // Prevent form submission
  }

  return true; // Return true if all validations pass
}

// Handle the payment button click
var payButton = document.getElementById("pay-btn");

payButton.onclick = function () {
  const formValid = validateForm();
  if (formValid) {
    document.getElementById("confirmation-modal").style.display = "block"; // Open the modal if form is valid
  }
};

// Load selected items into checkout page
let selectedCartItems =
  JSON.parse(localStorage.getItem("selectedCartItems")) || [];
let checkoutTotal = localStorage.getItem("checkoutTotal") || "0.00";

// Function to load and display items in checkout
function loadCheckoutItems() {
  const checkoutItemsContainer = document.getElementById("checkout-items");
  checkoutItemsContainer.innerHTML = ""; // Clear existing items

  let totalQuantity = 0;

  // Check if the cart is empty
  if (selectedCartItems.length === 0) {
    checkoutItemsContainer.innerHTML = "<p>Your cart is empty.</p>"; // Display empty cart message
  } else {
    // Display selected cart items
    selectedCartItems.forEach((item) => {
      totalQuantity += item.quantity; // Update total quantity
      const itemElement = document.createElement("div");
      itemElement.className = "checkout-item"; // Add a class for styling

      // Construct item HTML with image
      itemElement.innerHTML = `
  <img src="${item.image}" alt="${item.name}" class="checkout-item-image" />
  <span class="checkout-item-title">${item.name}</span>
  <div class="checkout-item-info">
  <div class="checkout-item-quantity">Quantity: ${item.quantity}</div>
  <span>Price: $${(item.price * item.quantity).toFixed(2)}</span>
</div>

`;
      checkoutItemsContainer.appendChild(itemElement);
    });
  }

  // Update totals
  document.getElementById("total-products").textContent = totalQuantity;
  document.getElementById("subtotal").textContent = `$${parseFloat(
    checkoutTotal
  ).toFixed(2)}`;
  document.getElementById("total").textContent = `$${parseFloat(
    checkoutTotal
  ).toFixed(2)}`;
}

const discountCodes = {
  SAVE10: 10, // 10% discount
  SAVE5: 5, // $5 off
};

document.getElementById("apply-discount").onclick = function () {
  const code = document.getElementById("discount-code").value;
  let discount = discountCodes[code];

  if (discount) {
    let total = parseFloat(
      document.getElementById("subtotal").textContent.slice(1)
    );

    if (typeof discount === "number") {
      total -= discount; // If it's a fixed amount discount
    } else {
      total -= (total * discount) / 100; // If it's a percentage discount
    }

    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    document.getElementById(
      "discount-message"
    ).textContent = `Discount applied: $${discount}`;
  } else {
    alert("Invalid discount code.");
  }
};

// Show checkout items on page load
loadCheckoutItems();

// Payment confirmation modal
var modal = document.getElementById("confirmation-modal");
var btn = document.getElementById("pay-btn");
var span = document.getElementsByClassName("close")[0];

// Open modal on payment button click
btn.onclick = function () {
  const formValid = validateForm();
  if (formValid) {
    modal.style.display = "block"; // Open the modal if form is valid
  }
};

// Close modal when clicking the close button
span.onclick = function () {
  modal.style.display = "none";
};

// Close modal on click outside
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Confirm payment and reset the cart
var confirmButton = document.getElementById("confirm-payment");

confirmButton.onclick = function () {
  // Close the modal
  modal.style.display = "none";

  // Get the selected cart items that were purchased
  let selectedCartItems =
    JSON.parse(localStorage.getItem("selectedCartItems")) || [];

  // Clear the purchased items from the main cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  selectedCartItems.forEach((purchasedItem) => {
    // Remove each purchased item from the cart
    cart = cart.filter((cartItem) => cartItem.id !== purchasedItem.id);
  });

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Clear the localStorage for selected items and total
  localStorage.removeItem("selectedCartItems");
  localStorage.removeItem("checkoutTotal");

  // Reset the checkout items
  selectedCartItems = [];
  checkoutTotal = "0.00";

  // Refresh the checkout display
  loadCheckoutItems();

  // Show thank you message
  alert("Thank you for your purchase!");

  // Redirect to the shop page
  window.location.href = "shop.html";
};
