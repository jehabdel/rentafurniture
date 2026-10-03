// Cart management
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('ecomCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    return cart;
}

// Check if cart is empty and show modal
function checkCartEmpty() {
    loadCart();
    
    const modal = document.getElementById('emptyCartModal');
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    if (cart.length === 0) {
        // Show modal if cart is empty
        modal.classList.add('show');
    } else {
        // Display cart items
        displayCartItems();
        calculateTotals();
    }
}

// Display cart items in order summary
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">No items in cart to checkout.</p>';
        return;
    }
    
    let itemsHTML = '';
    cart.forEach(item => {
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
}

// Calculate order totals
function calculateTotals() {
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const shipping = subtotal >= 50 ? 0 : 0; // Free shipping for all
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Handle form submission
document.getElementById('checkout-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
    }
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        payment: document.querySelector('input[name="payment"]:checked').value,
        items: cart,
        total: document.getElementById('total').textContent
    };
    
    console.log('Order submitted:', formData);
    
    // Show success message
    alert('Thank you for your order! We will process it shortly.');
    
    // Clear cart
    localStorage.removeItem('ecomCart');
    cart = [];
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});

// Close modal when clicking outside
document.getElementById('emptyCartModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        window.location.href = 'index.html';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkCartEmpty();
});
