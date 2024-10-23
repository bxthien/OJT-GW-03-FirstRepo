
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
