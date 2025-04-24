let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart images on the customer care page
function displayCartImages() {
    const cartImagesContainer = document.getElementById('cart-images');
    cartImagesContainer.innerHTML = ''; // Clear previous images

    cart.forEach(item => {
        const img = document.createElement('img');
        img.src = item.image; // Assuming each item has an 'image' property
        img.alt = item.product; // Use product name as alt text
        img.style.width = '100px'; // Set a fixed width for images
        img.style.margin = '10px'; // Add some margin
        cartImagesContainer.appendChild(img);
    });
}

// Call the function to display cart images when the page loads
displayCartImages();

// DOM elements
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

// Render cart items
function renderCart() {
    cartItemsEl.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItemEl = document.createElement('li');
        cartItemEl.className = 'cart-item';
        
        cartItemEl.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}" class="item-image" style="width: 50px; height: auto;">
                <div class="item-name">${item.name}</div>
                <div class="item-price">₹${item.price}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        
        cartItemsEl.appendChild(cartItemEl);
        totalPrice += item.price * item.quantity;
    });

    totalPriceEl.textContent = totalPrice.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

// Change item quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    renderCart();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    renderCart();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', renderCart);
