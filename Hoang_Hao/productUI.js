document.addEventListener("DOMContentLoaded", function() {

    // Lấy tất cả sản phẩm 
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const productsContainer = document.getElementById('products');
        json.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <p>${product.description.substring(0, 50)}...</p>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    })
    .catch(err => console.error(err));

    // Lấy sản phẩm nổi bật
    const apiUrl = 'https://fakestoreapi.com/products?limit=8';

    async function fetchFeaturedProducts() {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            displayFeaturedProducts(products);
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    }

    function displayFeaturedProducts(products) {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <p>${product.description.substring(0, 50)}...</p>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;

            productList.appendChild(productItem);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    const cart = [];

    function addToCart(event) {
        const productId = event.target.dataset.id;

        //ktra sản phẩm có trong giỏ hàng 
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            alert("Product is already in the cart!");
        } else {
            fetch(`https://fakestoreapi.com/products/${productId}`)
                .then(res => res.json())
                .then(product => {
                    cart.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                    alert(`${product.title} has been added to the cart!`);
                    console.log(cart);
                })
                .catch(err => console.error(err));
        }
    }

    // lấy và hiện thị sp nổi bật khi load 
    fetchFeaturedProducts();
});
