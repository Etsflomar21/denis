// Catálogo, carrito local, formularios y mensajes de WhatsApp.
// Formato de precios y estado del carrito guardado en este navegador.
const money = (n) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    n,
  );
let cart;
try {
  cart = JSON.parse(localStorage.getItem("huallan-cart")) || {};
} catch {
  cart = {};
}
let activeFilter = "Todos";
function save() {
  try {
    localStorage.setItem("huallan-cart", JSON.stringify(cart));
  } catch {}
  renderCartCount();
}
// Catálogo: filtros de categoría, búsqueda y fichas de producto.
function renderFilters() {
  document.getElementById("filters").innerHTML = ["Todos", "Miel", "Derivados"]
    .map(
      (c) =>
        `<button class="filter ${activeFilter === c ? "active" : ""}" aria-pressed="${activeFilter === c}" onclick="setFilter('${c}')">${c}</button>`,
    )
    .join("");
}
function setFilter(c) {
  activeFilter = c;
  renderFilters();
  renderProducts();
}
const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
function renderProducts() {
  const query = normalize(
    document.getElementById("product-search").value.trim(),
  );
  const products = PRODUCTOS.filter(
    (product) =>
      (activeFilter === "Todos" || product.categoria === activeFilter) &&
      normalize(product.nombre + " " + product.descripcion).includes(query),
  );
  document.getElementById("no-results").hidden = products.length > 0;
  document.getElementById("products").innerHTML = products
    .map(
      (p) =>
        `<article class="product"><div class="product-image"><img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.style.display='none'"><span class="tag">${p.etiqueta}</span></div><div class="product-info"><h3>${p.nombre}</h3><p>${p.descripcion}</p><div class="product-bottom"><span class="price">${money(p.precio)}${p.pesoKg > 0 ? `<small>${money(p.precio / p.pesoKg)} por kg</small>` : ""}</span><button class="smallbtn" aria-label="Agregar ${p.nombre} al carrito" onclick="addToCart(${p.id})">+ Agregar</button></div></div></article>`,
    )
    .join("");
}
// Carrito: cantidades, subtotales y diálogo de compra.
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  save();
  toast("Producto agregado al carrito ✓");
}
function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  save();
  renderCart();
}
function renderCartCount() {
  document.getElementById("cart-count").textContent = Object.values(
    cart,
  ).reduce((a, b) => a + b, 0);
}
function renderCart() {
  const items = PRODUCTOS.filter((p) => cart[p.id] > 0);
  document.getElementById("cart-list").innerHTML = items.length
    ? items
        .map(
          (p) =>
            `<div class="cart-item"><div><b>${p.nombre}</b><small>${money(p.precio)} c/u</small><div class="qty"><button onclick="changeQty(${p.id},-1)" aria-label="Restar uno">−</button><span>${cart[p.id]}</span><button onclick="changeQty(${p.id},1)" aria-label="Sumar uno">+</button></div></div><b>${money(p.precio * cart[p.id])}</b></div>`,
        )
        .join("")
    : '<div class="empty">🐝<p>Tu carrito está vacío.</p><a href="#catalogo" onclick="closeCart()">Explorar productos</a></div>';
  document.getElementById("cart-total").textContent = money(
    items.reduce((sum, p) => sum + p.precio * cart[p.id], 0),
  );
  document.getElementById("checkout").disabled = !items.length;
  document.getElementById("order-fields").hidden = !items.length;
}
const cartDialog = document.getElementById("cart-overlay");
function openCart() {
  renderCart();
  cartDialog.showModal();
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDialog.close();
}
cartDialog.addEventListener("close", () => {
  document.body.style.overflow = "";
});
// WhatsApp: construcción del enlace y mensaje listo para revisar y enviar.
function whatsappLink(message) {
  if (!/^\d{10,15}$/.test(CONFIG.whatsapp)) {
    alert(
      "Antes de enviar pedidos, edita CONFIG.whatsapp en assets/js/config.js con tu número real. Ejemplo de formato para Perú: 51 seguido de 9 dígitos.",
    );
    return null;
  }
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}
function checkout(event) {
  event.preventDefault();
  const items = PRODUCTOS.filter((product) => cart[product.id] > 0);
  if (!items.length) return;
  const nameInput = document.getElementById("order-name");
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.setCustomValidity("Escribe tu nombre.");
    nameInput.reportValidity();
    return;
  }
  const delivery = document.getElementById("order-delivery").value.trim();
  const lines = items.map((product) => {
    const quantity = cart[product.id];
    return `• ${quantity} × ${product.nombre} — ${money(product.precio)} c/u — ${money(product.precio * quantity)}`;
  });
  const total = items.reduce(
    (sum, product) => sum + product.precio * cart[product.id],
    0,
  );
  const message = [
    "¡Hola, Miel del Huallan! Quiero realizar este pedido.",
    "",
    ...lines,
    "",
    `Total de productos: ${money(total)}`,
    `Cliente: ${name}`,
    `Entrega: ${delivery || "Por coordinar"}`,
    "",
    "Estoy listo/a para comprar. ¿Me confirman disponibilidad, entrega y forma de pago?",
  ].join("\n");
  const url = whatsappLink(message);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}
function toggleMenu() {
  const el = document.getElementById("mobile-links");
  el.style.display = el.style.display === "none" ? "block" : "none";
}
// Eventos de los formularios e inicialización de la interfaz.
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("client-name").value.trim();
  const message = document.getElementById("client-message").value.trim();
  if (!name || !message) return;
  const url = whatsappLink(`Hola, soy ${name}. 🐝\n\n${message}`);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
});
document
  .getElementById("product-search")
  .addEventListener("input", renderProducts);
document.getElementById("order-form").addEventListener("submit", checkout);
document
  .getElementById("order-name")
  .addEventListener("input", (event) => event.target.setCustomValidity(""));
document.getElementById("location-text").textContent = CONFIG.ubicacion;
document.getElementById("phone-text").textContent = /^\d{10,15}$/.test(
  CONFIG.whatsapp,
)
  ? "+" + CONFIG.whatsapp
  : "Configura tu número de atención";
document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderProducts();
renderCartCount();
