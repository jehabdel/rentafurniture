// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Show specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play slider
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Category carousel navigation
    const categoryNav = document.querySelectorAll('.section-nav .nav-arrow');
    const categoriesGrid = document.querySelector('.categories-grid');
    
    if (categoryNav.length > 0 && categoriesGrid) {
        categoryNav[0].addEventListener('click', () => {
            categoriesGrid.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        categoryNav[1].addEventListener('click', () => {
            categoriesGrid.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class on scroll for sticky header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});
