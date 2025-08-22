// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  alert(`${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function updateQuantity(id, qty) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity = parseInt(qty) || 1;
    saveCart();
    renderCart();
  }
}

function renderCart() {
  const tableBody = document.querySelector('#cart-items');
  const subtotalEl = document.querySelector('#cart-subtotal');
  if (!tableBody || !subtotalEl) return;

  tableBody.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const total = item.price * item.quantity;
    subtotal += total;
    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.quantity}" class="form-control" style="width:80px"
          onchange="updateQuantity(${item.id}, this.value)"></td>
        <td>$${total.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button></td>
      </tr>
    `;
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}
