let productslist = []

fetch('https://fakestoreapi.com/products')
  .then(async res => {
    const data = await res.json();
    data.map((item) => productslist.push(item))
    
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
            <svg
              height="20"
              width="20"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
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
        <button class="card__btn">View</button>
      </footer>
    `;
    container.appendChild(article);
  });
}

// Function to handle image click
function handleImageClick(id) {
  const itemProduct = productslist.length && productslist.find(item => Number(item.id) === Number(id))

  const container = document.querySelector('.left-column');
  container.innerHTML = `<img data-image="" src="${itemProduct.image}" alt="">`; 

  descriptionContainer.innerHTML = `
  <span>${itemProduct.category}</span>
  <h1 style="font-weight: bold;">${itemProduct.title}</h1>
  <p>${itemProduct.description}</p>
`;
}
