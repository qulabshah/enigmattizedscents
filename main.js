// Mock Database
const mockDatabase = {
    users: [
        { id: 1, email: "user@example.com", password: "password123" }
    ],
    products: [
        { id: 1, name: "Mysterious Desire", category: "Men", price: 2200, description: "A captivating scent for the daring.", image: "Mysteriousdesire.jpg" },
        { id: 2, name: "Regality", category: "Men", price: 1650, description: "A royal fragrance for the sophisticated.", image: "Regality.jpg" },
        { id: 3, name: "Rhythmic Drops", category: "Women", price: 1800, description: "A melody of floral notes.", image: "Rythmic drops.jpg" },
        { id: 4, name: "Petal of Heaven", category: "Women", price: 1500, description: "A soft and delicate fragrance.", image: "Petal of Heaven.jpg" }
    ],
    cart: [],
};

// Save mock database to localStorage for persistence
function saveToLocalStorage() {
    localStorage.setItem('mockDatabase', JSON.stringify(mockDatabase));
}

// Load mock database from localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('mockDatabase');
    if (data) {
        return JSON.parse(data);
    }
    return mockDatabase;  // Default if nothing exists in localStorage
}

// Example functions interacting with "database"
function addProductToCart(productId) {
    const product = mockDatabase.products.find(p => p.id === productId);
    if (product) {
        mockDatabase.cart.push(product);
        saveToLocalStorage();
        updateCartUI();
    }
}

function removeProductFromCart(productId) {
    const index = mockDatabase.cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        mockDatabase.cart.splice(index, 1);
        saveToLocalStorage();
        updateCartUI();
    }
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    let total = 0;
    mockDatabase.cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price} PKR <button onclick="removeProductFromCart(${item.id})">Remove</button>`;
        cartItemsList.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: ${total} PKR`;
}

// On page load, load data from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const data = loadFromLocalStorage();
    mockDatabase.products = data.products;
    mockDatabase.cart = data.cart;
    updateCartUI();
});
