document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  // Kartlara click eventi
  cards.forEach((card) => {
    const addToCartButton = card.querySelector(".cart");
    const productId = addToCartButton.getAttribute("name");
    addToCartButton.addEventListener("click", () => {
      addToCart(productId);
      uptadeCartCount();
      uptadeCartPage();
    });
  });
  // sebete mehsul elave etme
  function addToCart(productId) {
    const priceElement = document.getElementById("price-" + productId);
    const nameElement = document.getElementById("name-" + productId);
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const imageElement = card.querySelector('.image img');
        const src = imageElement.src;
    });
    const price = parseFloat(priceElement.innerText.replace("$", "").trim());
    const name = nameElement.innerText;
    const src = imageElement.src;
    // sebete mehsulu elave et
    const cartItem = { name, price, src };
    addToCartStorage(cartItem);
  }
  // SEBET BILGILERINI LOCALA ELAVE ET
  function addToCartStorage(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // SEBET SAYISI
  function uptadeCartCount() {
    const cartCount = document.getElementById("num");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.length;
  }
  // SEBET SEHIFESI
  function uptadeCartPage() {
    const cartItemContainer = document.querySelector(".container-list .row");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add = "left";
      newItem.innerHTML = `
    <img src=${item.src} alt="">
    <div class="text">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
            <button class="delete" onclick="removeFromCart()"  >delete</button>
            <button class="save">Save for later</button>
    </div>
    `;
      cartItemContainer.appendChild(newItem);
    });
    updateTotal(cart);
  }
  function updateTotal(cart) {
    const subtotalElement = document.querySelector(
      ".total .txt:nth-child(1) p:last-child"
    );
    const discountElement = document.querySelector(
      ".total .txt:nth-child(2) p:last-child"
    );
    const taxElement = document.querySelector(
      ".total .txt:nth-child(3) p:last-child"
    );
    const totalElement = document.querySelector(
      ".total .txt:nth-child(4) p:last-child"
    );

    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price;
    });

    const discount = 0;
    const taxRate = 0.18;

    const discountAmount = discount;
    const taxAmount = subtotal * taxRate;
    const total = subtotal - discount + taxAmount;

    subtotalElement.innerText = "$" + subtotal.toFixed(2);
    discountElement.innerText = "$" + discountAmount.toFixed(2);
    taxElement.innerText = "$" + taxAmount.toFixed(2);
    totalElement.innerText = "$" + total.toFixed(2);
  }

  uptadeCartCount();
  uptadeCartPage();
});
function GetShoppingCartPage() {
  window.location.href = "/cart.html";
}
function GetBrandPage() {
  window.location.href = "/index.html";
}

const removeButtons = document.querySelectorAll(".delete");

removeButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    removeFromCart(i); 
  });
});

function removeFromCart() {
  const button = this;
  const index = Array.from(
    button.parentNode.parentNode.parentNode.children
  ).indexOf(button.parentNode.parentNode);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); 
  uptadeCartCount();
  uptadeCartPage(); 
}
