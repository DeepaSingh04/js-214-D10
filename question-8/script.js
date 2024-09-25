const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch data and display
async function fetchAndDisplayData() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    
    const sortCriteria = document.getElementById('sort').value;
    const sortedProducts = sortProducts(products, sortCriteria);
    
    displayProducts(sortedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    document.getElementById('product-list').innerHTML = '<p>Failed to load products. Please try again later.</p>';
  }
}

// Sort products by criteria
function sortProducts(products, criteria) {
  return products.sort((a, b) => {
    if (criteria === 'company') {
      return a.company.name.localeCompare(b.company.name);
    }
    return a[criteria].localeCompare(b[criteria]);
  });
}

// Display products
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Email: ${product.email}</p>
      <p>Company: ${product.company.name}</p>
      <p>Phone: ${product.phone}</p>
      <p>Website: ${product.website}</p>
    `;
    productList.appendChild(productElement);
  });
}

// Initial fetch and display
fetchAndDisplayData();
