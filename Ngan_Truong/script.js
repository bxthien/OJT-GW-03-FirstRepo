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

    if (products.length === 0) {
        // No products found
        resultsDiv.innerHTML = `
            <div class="no-products-found">
                <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2lraWNqMjg1bTRmc2Z0YTU3Z2MzbW41ZHc3cWo3Nnp2aXlia3gxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lPM06f2zvk94jBAzlP/giphy.webp" alt="No products found" class="no-products-image">
                <p class="no-products-text">No products found</p>
            </div>
        `;
        return;
    }

    // Display found products
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
    showSuggestions(relatedProducts); 
   
});

// Search by press enter key
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts(); 
        document.getElementById('suggestionList').style.display = 'none';  
    }
});

// Search by icon click
document.querySelector('.search-icon').addEventListener('click', function() {
    searchProducts();  
    document.getElementById('suggestionList').style.display = 'none'; 
});

// Hide suggestion list when clicking outside the search bar
document.addEventListener('click', function(event) {
    const suggestionList = document.getElementById('suggestionList');
    const searchBar = document.getElementById('searchInput');
    
    // Hide the suggestion list if the click is outside the search bar and suggestion list
    if (!searchBar.contains(event.target) && !suggestionList.contains(event.target)) {
        suggestionList.style.display = 'none';
    }
});

// Prevent the suggestion list when clicking inside the search bar
document.getElementById('searchInput').addEventListener('focus', function() {
    const query = this.value.toLowerCase();
    if (query.trim() !== '') {
        const relatedProducts = allProducts.filter(product => product.title.toLowerCase().includes(query));
        showSuggestions(relatedProducts);
    }
});

fetchProducts();
