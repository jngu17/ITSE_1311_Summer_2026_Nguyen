
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

const menuContainer = document.getElementById("menuContainer");

if (menuContainer) {
    MENU_ITEMS.forEach(item => {
        menuContainer.innerHTML += `
            <div class="card m-3 p-3">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Price:</strong> ${money.format(item.price)}</p>
            </div>
        `;
    });
}


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