
let currentSlide = 0;
const totalSlides = 3;

// Initialize carousel
function initCarousel() {
    updateCarousel();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const carousel = document.querySelector('.carousel-wrapper');
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}

// Navigate to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Navigate to previous slide
function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Update carousel position and indicators
function updateCarousel() {
    const slidesContainer = document.querySelector('.carousel-slides');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slide');
    
    // Move slides
    const translateX = -currentSlide * (100 / totalSlides);
    slidesContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update slide active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    // Trigger slide animation
    const currentSlideElement = slides[currentSlide];
    const slideContent = currentSlideElement.querySelector('.slide-content');
    
    // Remove animation class and add it back to retrigger animation
    slideContent.style.animation = 'none';
    setTimeout(() => {
        slideContent.style.animation = 'fadeInUp 0.8s ease-out';
    }, 50);
}

// Download resume function
function downloadResume() {
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('John Space Developer - Resume\n\nThis is a placeholder for the actual resume file.');
    link.download = 'John_Space_Developer_Resume.txt';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showToast('Resume download started! 🚀');
}

// Toast notification function
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(45deg, #dc143c, #1e90ff)',
        color: '#fff',
        padding: '15px 25px',
        borderRadius: '50px',
        fontFamily: 'Orbitron, monospace',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(220, 20, 60, 0.5)',
        zIndex: '1000',
        animation: 'slideInRight 0.5s ease-out',
        cursor: 'pointer'
    });
    
    // Add slide in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 500);
        }
    }, 3000);
    
    // Remove on click
    toast.addEventListener('click', () => {
        toast.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 500);
    });
}

// Auto-advance slides (optional)
function startAutoAdvance() {
    setInterval(() => {
        nextSlide();
    }, 10000); // Change slide every 10 seconds
}

// Skill item hover effects
function initSkillEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Project card effects
function initProjectEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image i');
            if (image) {
                image.style.transform = 'scale(1.1) rotate(10deg)';
                image.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image i');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Social link effects
function initSocialEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const icon = link.querySelector('i');
            const originalTransform = link.style.transform;
            
            // Bounce effect
            link.style.transform = 'scale(0.8)';
            setTimeout(() => {
                link.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    link.style.transform = originalTransform;
                    
                    // Show message based on social platform
                    let message = '';
                    if (icon.classList.contains('fa-github')) {
                        message = 'Opening GitHub profile... 🚀';
                        setTimeout(() => window.open('https://github.com', '_blank'), 500);
                    } else if (icon.classList.contains('fa-linkedin')) {
                        message = 'Opening LinkedIn profile... 💼';
                        setTimeout(() => window.open('https://linkedin.com', '_blank'), 500);
                    } else if (icon.classList.contains('fa-envelope')) {
                        message = 'Opening email client... 📧';
                        setTimeout(() => window.location.href = 'mailto:contact@example.com', 500);
                    }
                    
                    showToast(message);
                }, 100);
            }, 100);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillEffects();
    initProjectEffects();
    initSocialEffects();
    
    // Optional: Start auto-advance (uncomment to enable)
    // startAutoAdvance();
    
    console.log('🍕 Space Pizza Portfolio loaded successfully! 🚀');
});

// Handle window resize
window.addEventListener('resize', () => {
    updateCarousel();
});

// Prevent context menu on images (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add some fun easter eggs
let konami = [];
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konami.push(e.code);
    if (konami.length > konamiCode.length) {
        konami.shift();
    }
    
    if (konami.join(',') === konamiCode.join(',')) {
        showToast('🍕 PIZZA POWER ACTIVATED! 🚀');
        
        // Add extra pizzas temporarily
        const extraPizzas = document.createElement('div');
        extraPizzas.innerHTML = '🍕🍕🍕🍕🍕';
        extraPizzas.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            z-index: 1000;
            animation: spin 2s linear, fadeOut 3s ease-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(extraPizzas);
        
        setTimeout(() => {
            if (extraPizzas.parentNode) {
                extraPizzas.remove();
            }
        }, 3000);
        
        konami = [];
    }
});
