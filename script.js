// Define Product Class
class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image; // Added image property
        this.quantity = 0;
    }

    // Increment the quantity of the product
    increment() {
        this.quantity++;
    }

    // Decrement the quantity of the product
    decrement() {
        if (this.quantity > 0) {
            this.quantity--;
        }
    }

    // Get the total price for the product
    totalPrice() {
        return this.price * this.quantity;
    }
}

// Define Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Add a product to the cart
    addProduct(product) {
        this.items.push(product);
        this.updateCart();
    }

    // Remove a product from the cart
    removeProduct(index) {
        this.items.splice(index, 1);
        this.updateCart();
    }

    // Update the cart display and total price
    updateCart() {
        const cartList = document.querySelector('.cartTab .products-list');
        const totalElement = document.querySelector('#total span');
        cartList.innerHTML = ''; // Clear existing cart items

        let total = 0;

        this.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
                <h2>${item.name}</h2>
                <h4>${item.totalPrice().toFixed(2)} $</h4>
                <button onclick="cart.removeProduct(${index})">Remove</button>
            `;
            cartList.appendChild(itemElement);
            total += item.totalPrice();
        });

        totalElement.textContent = total.toFixed(2); // Update total price
        document.querySelector('.icon-cart span').textContent = this.items.length; // Update cart count
    }
}

// Initialize products and shopping cart
const products = [
    new Product("Silver Pocket Watch", 24.22, "watch4.jpeg"),
    new Product("One Piece Pocket Watch", 40.95, "watch3.jpeg"),
    new Product("Gold Pocket Watch", 22.50, "images44.jpeg"),
    new Product("Black Pocket Watch", 75.00, "watch66.jpeg")
];

const cart = new ShoppingCart();

// Add event listeners to product buttons
const productElements = document.querySelectorAll('.product');

productElements.forEach((productElement, index) => {
    const plusButton = productElement.querySelector('.plus');
    const minusButton = productElement.querySelector('.minus');
    const quantityElement = productElement.querySelector('.quantity');

    plusButton.addEventListener('click', () => {
        products[index].increment();
        quantityElement.textContent = products[index].quantity;
        updateCartDisplay();
    });

    minusButton.addEventListener('click', () => {
        products[index].decrement();
        quantityElement.textContent = products[index].quantity;
        updateCartDisplay();
    });
});

// Function to update cart display
function updateCartDisplay() {
    cart.items = products.filter(product => product.quantity > 0);
    cart.updateCart();
}

// Function to add product to cart when clicked
function addToCart(index) {
    products[index].increment();
    updateCartDisplay();
}

// Function to remove item from the cart
function removeItem(index) {
    cart.removeProduct(index);
    products[index].quantity = 0; // Reset the quantity in products
    updateCartDisplay();
}