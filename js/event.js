const discountTrack = document.querySelector('.discount-track');
const discountImages = document.querySelectorAll('.discount-track img');
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
