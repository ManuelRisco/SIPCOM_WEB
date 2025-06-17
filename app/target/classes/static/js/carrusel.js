const slider = document.querySelector('.slider-box ul');
const slidesCount = slider.children.length;
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoplayInterval;

function updateSlider() {
    const translateXPercent = -(currentIndex * 25);
    slider.style.transform = `translateX(${translateXPercent}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slidesCount;
    updateSlider();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000); // Cambia imagen cada 3s
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Flechas
document.querySelector('.arrow.next').addEventListener('click', () => {
    stopAutoplay();
    nextSlide();
    startAutoplay();
});

document.querySelector('.arrow.prev').addEventListener('click', () => {
    stopAutoplay();
    currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
    updateSlider();
    startAutoplay();
});

// Bolitas
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoplay();
        currentIndex = parseInt(dot.getAttribute('data-index'));
        updateSlider();
        startAutoplay();
    });
});

// Iniciar autoplay al cargar
startAutoplay();
