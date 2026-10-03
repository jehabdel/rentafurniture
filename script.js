// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
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

// Cart functionality
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('ecomCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('ecomCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cartBadge = document.querySelector('.cart-btn .badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// Add to cart function
function addToCart(product) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }
    
    saveCart();
    showAddToCartNotification(product.name);
}

// Show notification when item is added to cart
function showAddToCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-info h3').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            const priceText = productCard.querySelector('.product-price .price').textContent;
            const productPrice = parseFloat(priceText.replace('$', ''));
            const productImage = productCard.querySelector('.product-image img').src;
            
            const product = {
                name: productName,
                category: productCategory,
                price: productPrice,
                image: productImage
            };
            
            addToCart(product);
        });
    });
    
    // View Switcher functionality (Mobile only)
    setupViewSwitcher();
});

// View Switcher Setup
function setupViewSwitcher() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrids = document.querySelectorAll('.products-grid');
    
    // Load saved view preference
    const savedView = localStorage.getItem('productView') || 'two-column';
    applyView(savedView);
    
    // Add click handlers to view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Remove active class from all buttons in the same section
            const section = this.closest('.products-section, .best-selling-section');
            const sectionButtons = section.querySelectorAll('.view-btn');
            sectionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply view to the current section's grid
            const grid = section.querySelector('.products-grid');
            applyViewToGrid(grid, view);
            
            // Save preference
            localStorage.setItem('productView', view);
            
            // Sync all other view switchers
            syncViewSwitchers(view);
        });
    });
}

function applyView(view) {
    const productsGrids = document.querySelectorAll('.products-grid');
    productsGrids.forEach(grid => {
        applyViewToGrid(grid, view);
    });
    
    // Update all buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        if (button.getAttribute('data-view') === view) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function applyViewToGrid(grid, view) {
    grid.classList.remove('two-column', 'single-column', 'list-view');
    
    if (view === 'single-column') {
        grid.classList.add('single-column');
    } else if (view === 'list-view') {
        grid.classList.add('list-view');
    }
    // two-column is the default (no class needed)
}

function syncViewSwitchers(view) {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        if (button.getAttribute('data-view') === view) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    const productsGrids = document.querySelectorAll('.products-grid');
    productsGrids.forEach(grid => {
        applyViewToGrid(grid, view);
    });
}
