let allProducts = [];

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        displayProducts(products);
    })
    .catch(error => console.error('Error:', error));

// Function to display products
function displayProducts(products) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // xoá kết quả

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
};


// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(query)); 
    displayProducts(filteredProducts); 
});
