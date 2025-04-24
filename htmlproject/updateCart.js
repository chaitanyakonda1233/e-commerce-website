let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items with images
function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
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

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
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

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', renderCart);
