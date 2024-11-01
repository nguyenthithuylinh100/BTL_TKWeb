//header
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPath = window.location.pathname;

  function updateActiveLink() {
    navLinks.forEach((link) => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      link.classList.toggle("active", linkPath === currentPath);
    });
  }

  updateActiveLink();

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener("popstate", updateActiveLink);
});

// Core values

function submitReview() {
  event.preventDefault(); //ngăn reset trang web
  const thankYouMessage = document.getElementById("thankYouMessage");
  const inname = document.getElementById("name");
  const inreview = document.getElementById("review");
  const inchoose = document.getElementById("rating");
  setTimeout(() => {
    thankYouMessage.style.display = "none"; // Ẩn thông báo sau 3 giây
  }, 5000);
  thankYouMessage.style.display = "block";

  inname.value = "";
  inreview.value = "";
  inchoose.value = "";
}

// Thống kê

// Hàm để tăng dần số lên đến giá trị mục tiêu
function animateNumber(element, target) {
  let current = 0;
  const increment = Math.ceil(target / 100);
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target + (element.dataset.target.includes("%") ? "%" : "");
      clearInterval(interval);
    } else {
      element.textContent =
        current + (element.dataset.target.includes("%") ? "%" : "");
    }
  }, 20);
}

// Sử dụng Intersection Observer để kiểm tra khi phần tử được thấy trên màn hình
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const targetValue = parseInt(
          statNumber.getAttribute("data-target"),
          10
        );
        animateNumber(statNumber, targetValue);
        observer.unobserve(statNumber);
      }
    });
  },
  { threshold: 0.5 }
);

// Áp dụng Observer cho tất cả các phần tử có class "stat-number"
document.querySelectorAll(".stat-number").forEach((statNumber) => {
  observer.observe(statNumber);
});

// loading

window.addEventListener("load", function () {
  var loading = document.getElementById("loading-screen");
  setTimeout(function () {
    loading.style.display = "none";
  }, 3300); // Thời gian trễ 3000ms (3 giây)
});

// Lucky Spin

const prizes = [
  "Better luck next time!",
  "Better luck next time!",
  "Apply code PRLQQVF28 for 10% off!",
  "Apply code GFTKAAL28 for 20% off!",
  "Apply code DNTQMS28 for 50% off!",
  "Apply code AEODGQ28 for $5 off!",
  "Apply code ANTEEF28 for $10 off!",
  "Better luck next time!",
];

let hasSpun = false; // Biến để kiểm tra nếu đã quay hay chưa

// Hàm quay vòng
function spinWheel() {
  if (hasSpun) {
    document.getElementById("messageText").textContent =
      "Out of turns! Better luck next time!";
    document.getElementById("messageBox").classList.add("show");
    return; // Dừng lại nếu đã quay
  }

  hasSpun = true; // Đánh dấu là đã quay
  const wheel = document.getElementById("wheel");
  const spinBtn = document.getElementById("spinBtn");
  spinBtn.disabled = true;

  // Quay ngẫu nhiên
  const randomDegree = Math.floor(Math.random() * 1080) + 360;
  wheel.style.transition = "transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)";
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  // Tính toán phần thưởng
  const prizeIndex = Math.floor(((randomDegree % 360) / 360) * prizes.length);
  const prize = prizes[prizeIndex];

  setTimeout(() => {
    document.getElementById("messageText").textContent = `${prize}`;
    document.getElementById("messageBox").classList.add("show");
  }, 4000);
}

// Đóng hộp thoại
function closeMessage() {
  document.getElementById("messageBox").classList.remove("show");
  document.getElementById("spinBtn").disabled = false; // Khôi phục nút khi đóng thông báo
}

// event

const discountTrack = document.querySelector(".discount-track");
const discountImages = document.querySelectorAll(".discount-track img");
const totalImages = discountImages.length;

// Tạo bản sao các ảnh để tạo hiệu ứng vòng lặp
for (let i = 0; i < totalImages; i++) {
  const clonedImage = discountImages[i].cloneNode(true);
  discountTrack.appendChild(clonedImage);
}

// Thiết lập chiều rộng của discount-track
const trackWidth = discountImages[0].clientWidth * totalImages;
discountTrack.style.width = `${trackWidth * 2}px`; // Gấp đôi chiều rộng

let position = 0;
let speed = 0.5; // Tốc độ cuộn

// Hàm cuộn
function scrollImages() {
  position -= speed; // Di chuyển sang trái
  discountTrack.style.transform = `translateX(${position}px)`;

  // Reset vị trí nếu đã cuộn qua nửa chiều rộng của track
  if (Math.abs(position) >= trackWidth) {
    position += trackWidth; // Đặt lại vị trí để nối đuôi
  }

  requestAnimationFrame(scrollImages);
}

// Bắt đầu cuộn
scrollImages();
// footer

function showThankYouMessage(event) {
  event.preventDefault();

  const thankYouMessage = document.getElementById("thankYouMessageft");
  const emailInput = document.getElementById("emailInput");
  const emailValue = emailInput.value.trim();

  // Email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email is in a valid format
  if (!emailPattern.test(emailValue)) {
    alert("Please enter a valid email address.");
    return; // Exit the function if the email is invalid
  }

  thankYouMessage.style.display = "block"; // Display the thank-you message
  setTimeout(() => {
    thankYouMessage.style.display = "none"; // Hide the message after 5 seconds
  }, 5000);

  emailInput.value = ""; // Clear the email input field
}
