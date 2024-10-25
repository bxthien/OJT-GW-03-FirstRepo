let productslist = [];

fetch('https://fakestoreapi.com/products')
  .then(async res => {
    const data = await res.json();
    data.map((item) => productslist.push(item));

    displayProducts(data);
  })
  .catch(err => console.error('Error fetching products:', err));

function displayProducts(products) {
  const container = document.querySelector('.container-product');
  container.innerHTML = ''; // Clear any existing content

  products.forEach(product => {
    const article = document.createElement('article');
    article.classList.add('card');
    article.innerHTML = `
      <section class="card__hero">
        <img src="${product.image}" alt="${product.title}" class="card__image" onclick="handleImageClick('${product.id}')" />
        <header class="card__hero-header">
          <span>$${product.price}</span>
          <div class="card__icon">
            <svg height="20" width="20" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </div>
        </header>
        <p class="card__job-title">${product.title}</p>
      </section>
      <footer class="card__footer">
        <div class="card__job-summary">
          <div class="card__job">
            <p class="card__job-title">${product.category}</p>
          </div>
        </div>
        <button class="card__btn" onclick="handleImageClick('${product.id}')">View</button>
      </footer>
    `;
    container.appendChild(article);
  });
}

// Function to handle image click
function handleImageClick(id) {
  const itemProduct = productslist.find(item => Number(item.id) === Number(id));

  const container = document.querySelector('.left-column');
  container.innerHTML = `<img src="${itemProduct.image}" alt="${itemProduct.title}">`;

  const descriptionContainer = document.querySelector('.right-column .product-description');
  descriptionContainer.innerHTML = `
    <span>${itemProduct.category}</span>
    <h1 style="font-weight: bold;">${itemProduct.title}</h1>
    <p>${itemProduct.description}</p>
  `;

  displayRelatedProducts(itemProduct.id); // Call to display related products
}

// Function to display related products
function displayRelatedProducts(currentProductId) {
  const relatedProductsContainer = document.getElementById('related-products');
  relatedProductsContainer.innerHTML = ''; // Clear existing content

  // Filter to get products except the current one
  const relatedProducts = productslist.filter(product => product.id !== currentProductId);

  // Limit to 5 related products
  relatedProducts.slice(0, 5).forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('related-product-item');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick="handleImageClick('${product.id}')">View Details</button>
    `;
    relatedProductsContainer.appendChild(productDiv);
  });
}


// Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Gọi API để lấy thông tin sản phẩm
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-price').innerText = `$${product.price}`;
    document.getElementById('product-category').innerText = product.category;
  })
  .catch(err => console.error(err));
