// JS para asignar la imagen según el atributo
document.querySelectorAll(".catalogo-item").forEach(item => {
  let img = item.getAttribute("data-img");
  item.style.backgroundImage = `url(${img})`;
});

// control del carrito
const CART_KEY = "APP_CART";
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function renderCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  const cart = getCart();
  cartItemsEl.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<li class='list-group-item text-center'>Carrito vacío</li>";
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${item.name} x${item.qty}</span>
        <span>$${item.price * item.qty}</span>
        <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${index})">✖</button>
      `;
      cartItemsEl.appendChild(li);
    });
  }
  totalEl.textContent = `$${total}`;
  if (countEl) countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Render al cargar la página
document.addEventListener("DOMContentLoaded", renderCart);
