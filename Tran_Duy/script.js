
let cart = [];

function addToCart(product, quantity) {
    const existingProduct = cart.find(item => item.product.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.cart-btn');
    const product = {
        name: 'Beats EP',
        price: 148,
        color: document.querySelector('input[name="color"]:checked').value
    };
    
    let quantity = 1;
    addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        addToCart(product, quantity);
        alert(`${product.name} has been added to your cart!`);
    });
});
document.querySelector('.cart-btn').addEventListener('click', () => {
    const productName = document.querySelector('h1').innerText;
    const productPrice = parseFloat(document.querySelector('p').innerText.replace('$', ''));
    const selectedColor = document.querySelector('input[name="color"]:checked').value;

    const existingProduct = cart.find(item => item.name === productName && item.color === selectedColor);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            color: selectedColor,
            quantity: 1
        });
    }
    document.querySelector('.cart-count').innerText = cart.reduce((total, item) => total + item.quantity, 0);
});

document.querySelector('.view-cart-btn').addEventListener('click', () => {
    const cartContents = document.querySelector('.cart-contents');
    const cartTotal = document.querySelector('.cart-total');
    cartContents.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} (Color: ${item.color}) - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`;
        cartContents.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
    document.querySelector('.cart').style.display = 'block'; 
});

document.querySelector('.close-cart-btn').addEventListener('click', () => {
    document.querySelector('.cart').style.display = 'none'; 
});