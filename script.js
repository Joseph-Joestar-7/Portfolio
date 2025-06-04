let currentSlide = 0;
const navItems = document.querySelectorAll('.nav-item');

function goToSlide(idx) {
  const carousel = document.querySelector('.carousel');
  
  // 1) Animate the carousel translateX
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${idx * 100}vw)`;

  // 2) Update the nav-item “active” class
  navItems[currentSlide]?.classList.remove('active');
  navItems[idx].classList.add('active');
  currentSlide = idx;
}

// 3) On page‐load, mark the first item as active
document.addEventListener('DOMContentLoaded', () => {
  navItems[0].classList.add('active');
});
