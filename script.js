document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const priceFilter = document.getElementById('priceFilter');
    const products = document.querySelectorAll('.product');
    const accountBtn = document.querySelector('.account-btn');
    const accountModal = document.getElementById('accountModal');
    const accountClose = accountModal.querySelector('.close');
    const cartBtn = document.querySelector('.cart-btn');
    const cartModal = document.getElementById('cartModal');
    const cartClose = cartModal.querySelector('.cart-close');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
  
    let cart = [];
  
    function filterProducts() {
      const selectedCategory = document.querySelector('.category-btn.selected')?.dataset.filter || 'all';
      const selectedPrice = priceFilter.value;
  
      products.forEach(product => {
        const category = product.dataset.category;
        const price = parseInt(product.dataset.price);
        const categoryMatch = (selectedCategory === 'all' || selectedCategory === category);
        const priceMatch = selectedPrice === 'all' ||
                           (selectedPrice === 'under1700' && price < 1700) ||
                           (selectedPrice === '2100plus' && price >= 2100);
  
        product.style.display = categoryMatch && priceMatch ? 'block' : 'none';
      });
    }
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        filterProducts();
      });
    });
  
    priceFilter.addEventListener('change', filterProducts);
  
    // Account Modal
    accountBtn.addEventListener('click', () => {
      accountModal.style.display = 'block';
    });
  
    accountClose.addEventListener('click', () => {
      accountModal.style.display = 'none';
    });
  
    // Cart Modal
    cartBtn.addEventListener('click', () => {
      cartModal.style.display = 'block';
    });
  
    cartClose.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  
    window.addEventListener('click', e => {
      if (e.target === accountModal) accountModal.style.display = 'none';
      if (e.target === cartModal) cartModal.style.display = 'none';
    });
  
    // Add to Cart Logic
    document.querySelectorAll('.product button').forEach(button => {
      button.addEventListener('click', () => {
        const product = button.closest('.product');
        const name = product.querySelector('h3').textContent;
        const price = parseInt(product.dataset.price);
  
        cart.push({ name, price });
        updateCartUI();
      });
    });
  
    function updateCartUI() {
      cartItemsList.innerHTML = '';
      let total = 0;
  
      cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `
          ${item.name} - ${item.price} PKR
          <button onclick="removeCartItem(${index})">Remove</button>
        `;
        cartItemsList.appendChild(li);
      });
  
      totalPriceElem.textContent = `Total: ${total} PKR`;
    }
  
    window.removeCartItem = function(index) {
      cart.splice(index, 1);
      updateCartUI();
    };
  
    checkoutBtn.addEventListener('click', () => {
      alert('Checkout is not implemented yet.');
    });
  
    // Initial filter setup
    filterProducts();
  });
  
