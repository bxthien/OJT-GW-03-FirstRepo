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

// Function to display products in the main grid
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

// Function to display product suggestions in the dropdown
function showSuggestions(products) {
    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = ''; 

    if (products.length === 0) {
        suggestionList.style.display = 'none';
        return;
    }

    products.forEach(product => {
        const suggestionItem = document.createElement('li');
        suggestionItem.classList.add('list-group-item');
        suggestionItem.textContent = product.title;

        // Handle click on suggestion
        suggestionItem.addEventListener('click', () => {
            document.getElementById('searchInput').value = product.title;
            searchProducts();  
            suggestionList.style.display = 'none';
        });

        suggestionList.appendChild(suggestionItem);
    });

    suggestionList.style.display = 'block';  // Show the dropdown
}

// Function to handle search
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

// Event listeners for search input
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const relatedProducts = allProducts.filter(product => product.title.toLowerCase().includes(query));
    showSuggestions(relatedProducts);  // Show suggestions based on input
});

// Search by enter key
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts();  
        document.getElementById('suggestionList').style.display = 'none';  // Hide suggestion list
    }
});

// Search by icon click
document.querySelector('.search-icon').addEventListener('click', function() {
    searchProducts();  
    document.getElementById('suggestionList').style.display = 'none'; 
});


fetchProducts();
