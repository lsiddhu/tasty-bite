// PAGE SWITCHING
function showPage(id) {
    let pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('show'));

    document.getElementById(id).classList.add('show');
}

// ADD TO CART SYSTEM
function openDish(dishId) {
    // hide all pages and show the dish detail page
    showPage(dishId);
}
// to open payment page
function goToPayment() {
    showPage("payment");
}
//after payment
function completePayment() {
    alert("Payment Successful! 🎉 Your order has been placed.");
    cart = [];
    updateCartDisplay();
    showPage("home");
}

// LOGIN VALIDATION
function validateLogin() {
    let email = document.getElementById("EmailVal");
    let pass = document.getElementById("passwordVal");

    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");

    emailError.textContent = "";
    passError.textContent = "";

    let ok = true;

    if (email.value.trim() === "") {
        emailError.textContent = "Enter Email";
        ok = false;
    }
    if (pass.value.trim() === "") {
        passError.textContent = "Enter Password";
        ok = false;
    }

    if (ok) alert("Login Successful!");
    showPage("home");
}

// DISH SEARCH
function searchDish() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(c => {
        let name = c.getAttribute("data-name").toLowerCase();
        c.style.display = name.includes(input) ? "block" : "none";
    });
}

// FILTER
function filterDish() {
    let type = document.getElementById("filterOption").value;
    let cards = document.querySelectorAll(".card");

    cards.forEach(c => {
        let dishType = c.getAttribute("data-type");

        if (type === "all" || type === dishType) {
            c.style.display = "block";
        } else {
            c.style.display = "none";
        }
    });
}
let cart = [];


function addToCart(btn) {
    const card = btn.parentElement;
    const name = card.getAttribute("data-name");
    const price = parseInt(card.querySelector(".price").innerText.replace("₹", ""));
    const img = card.querySelector("img").src;

    // Check if item already in cart
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            img,
            quantity: 1
        });
    }

    updateCartDisplay();

    showToast('Added to cart!');
}


function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");

    // If the element is NOT found, DO NOT display cart items anywhere else
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.img}" class="cart-img">
            
            <div class="cart-details">
                <p class="cart-name">${item.name}</p>
                <p>₹${item.price}</p>
            </div>

            <div class="qty-controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    document.getElementById("cart-total").innerText = `Total: ₹${total}`;
}


function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartDisplay();
}
// Example toast function
function showToast(message) {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}
