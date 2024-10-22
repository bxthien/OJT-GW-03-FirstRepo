let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allProducts = await response.json();
        displayProducts(allProducts); 
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('searchResults').innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}

// Function to display products
function displayProducts(products) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; 


    products.forEach(product => {

        const productCard = `
            <div class="col-md-3">
                <div class="card">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="product-price">$${product.price}</p>
                        <p class="product-description">${product.description}</p>
                    </div>
                </div>
            </div>
        `;
        resultsDiv.innerHTML += productCard;
    });
}

// Search functionality
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

// Listen for Enter key press
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// Listen for search icon click
document.querySelector('.search-icon').addEventListener('click', function() {
    searchProducts();
});

fetchProducts();
