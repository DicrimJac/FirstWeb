const PROD_KEY = "APP_PRODUCTS";

const seedProducts = [
  {
    id: 1,
    name: "Figura Goku",
    price: 15000,
    stock: 10,
    img: "img/reno.png"
  },
  {
    id: 2,
    name: "Figura Naruto",
    price: 12000,
    stock: 8,
    img: "img/reno.png"
  },
  {
    id: 3,
    name: "Figura Luffy",
    price: 18000,
    stock: 5,
    img: "img/reno.png"
  }
];

// === Inicializar productos si no existen ===
function loadProducts() {
  const raw = localStorage.getItem(PROD_KEY);
  if (!raw) {
    localStorage.setItem(PROD_KEY, JSON.stringify(seedProducts));
  }
}


const products = {
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem(PROD_KEY)) || [];
    } catch {
      return [];
    }
  },
  saveProducts(list) {
    localStorage.setItem(PROD_KEY, JSON.stringify(list));
  },
  addProduct(prod) {
    const all = this.getProducts();
    all.push(prod);
    this.saveProducts(all);
  },
  deleteProduct(id) {
    const all = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(all);
  },
  updateProduct(id, newProd) {
    const all = this.getProducts().map(p => p.id === id ? newProd : p);
    this.saveProducts(all);
  }
};
