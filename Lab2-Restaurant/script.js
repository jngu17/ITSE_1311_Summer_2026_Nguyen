
const MENU_ITEMS = [
    {
        id: 1,
        name: "Bulldog Breakfast Box",
        description: "Eggs, bacon, and potatoes",
        price: 12.99,
        category: "Breakfast"
    },

    {
        id: 2,
        name: "Steam Engine Omelet",
        description: "Three-egg omelet with cheese",
        price: 10.99,
        category: "Breakfast"
    },

    {
        id: 3,
        name: "Airship Pancake Stack",
        description: "Pancakes with maple syrup",
        price: 9.99,
        category: "Breakfast"
    },

    {
        id: 4,
        name: "Inventor's Lunch",
        description: "Chicken and noodles",
        price: 13.99,
        category: "Lunch"
    },

    {
        id: 5,
        name: "Steam Garden Bento",
        description: "Vegetables and rice",
        price: 11.99,
        category: "Lunch"
    },

    {
        id: 6,
        name: "Mechanic's Sandwich",
        description: "Turkey sandwich with chips",
        price: 12.49,
        category: "Lunch"
    },

    {
        id: 7,
        name: "Airship Captain Bento",
        description: "Beef, rice, and vegetables",
        price: 14.99,
        category: "Dinner"
    },

    {
        id: 8,
        name: "Sky Harbor Special",
        description: "Fish, rice, and salad",
        price: 15.99,
        category: "Dinner"
    },

    {
        id: 9,
        name: "Steamworks Steak",
        description: "Grilled steak with potatoes",
        price: 18.99,
        category: "Dinner"
    },

    {
        id: 10,
        name: "Mechanical Tea Set",
        description: "Tea and pastries",
        price: 8.99,
        category: "Dinner"
    }
];

const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

// --------------------
// MENU + FILTER LOGIC
// --------------------

const menuContainer = document.getElementById("menuContainer");
const categoryFilter = document.getElementById("categoryFilter");

function renderMenu(filter = "All") {
    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    const filteredItems = MENU_ITEMS.filter(item => {
        const mapped = item.category;
        return filter === "All" || mapped === filter;
    });

    filteredItems.forEach(item => {
        menuContainer.innerHTML += `
            <div class="card m-3 p-3">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Price:</strong> ${money.format(item.price)}</p>

                <label>Quantity:</label>
                <input type="number" id="qty-${item.id}" value="1" min="1" class="form-control w-25 mb-2">

                <button class="btn btn-success" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

if (menuContainer) {
    renderMenu();
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
        renderMenu(this.value);
    });
}

// --------------------
// CART LOGIC
// --------------------

function addToCart(id) {
    const item = MENU_ITEMS.find(i => i.id === id);
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${item.name} added to cart!`);
}

// --------------------
// RESERVATION FORM (UNCHANGED FROM LAB 2)
// --------------------

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const party = document.getElementById("party").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const notes = document.getElementById("notes").value;

        const seating = document.querySelector('input[name="seat"]:checked');

        let errorMessage = "";

        if (name === "") {
            errorMessage = "Name is required.";
        } else if (email === "") {
            errorMessage = "Email is required.";
        } else if (party === "") {
            errorMessage = "Party size is required.";
        } else if (date === "") {
            errorMessage = "Date is required.";
        } else if (time === "") {
            errorMessage = "Time is required.";
        } else if (!seating) {
            errorMessage = "Seating preference is required.";
        }

        if (notes.length > 30) {
            errorMessage = "Dietary Notes must be 30 characters or less";
        }

        if (name.length > 20) {
            errorMessage = "Name must be 20 characters or less";
        }

        const oldAlert = document.getElementById("formAlert");
        if (oldAlert) {
            oldAlert.remove();
        }

        const alertBox = document.createElement("div");
        alertBox.id = "formAlert";

        if (errorMessage !== "") {
            alertBox.className = "alert alert-danger";
            alertBox.textContent = errorMessage;
        } else {
            alertBox.className = "alert alert-success";
            alertBox.textContent = "Reservation submitted successfully!";

            const reservation = {
                name,
                email,
                party,
                date,
                time,
                seating: seating.id,
                notes
            };

            console.log(reservation);
        }

        reservationForm.prepend(alertBox);
    });
}

const cartContainer = document.getElementById("cartContainer");
const cartSummary = document.getElementById("cartSummary");

function loadCart() {
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartSummary.innerHTML = "";
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="card p-3 m-2">
                <h5>${item.name}</h5>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</p>

                <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    let tax = subtotal * 0.08;
    let total = subtotal + tax;

    cartSummary.innerHTML = `
        <h4>Subtotal: $${subtotal.toFixed(2)}</h4>
        <h4>Tax (8%): $${tax.toFixed(2)}</h4>
        <h3>Total: $${total.toFixed(2)}</h3>
    `;
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// auto-load cart page
if (cartContainer) {
    loadCart();
}

function confirmCancel() {
    localStorage.removeItem("cart");
    window.location.href = "menu.html";
}

function confirmSubmit() {
    localStorage.removeItem("cart");
    window.location.href = "menu.html";
}