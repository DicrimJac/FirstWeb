const PROD_KEY = "APP_PRODUCTS";

const seedProducts = [
  {
    id: 1,
    name: "Diorama Ataque de titanes",
    price: 150000,
    stock: 2,
    img: "img/attitans.jpg"
  },
  {
    id: 2,
    name: "Cloud - FF",
    price: 15000,
    stock: 10,
    img: "img/cloud.jpg"
  },
  {
    id: 3,
    name: "Espada Link - Tamaño Real",
    price: 70000,
    stock: 1,
    img: "img/espada.png"
  },
  {
    id: 4,
    name: "Figura 1",
    price: 10000,
    stock: 5,
    img: "img/figura1.png"
  },
  {
    id: 5,
    name: "Nendoroid - Itachi",
    price: 15000,
    stock: 5,
    img: "img/itachi.jpg"
  },
  {
    id: 6,
    name: "Figura Link - 30CM",
    price: 1000,
    stock: 5,
    img: "img/link.jpg"
  },
  {
    id: 7,
    name: "Figura Naruto",
    price: 20000,
    stock: 5,
    img: "img/naruto.jpg"
  },
  {
    id: 8,
    name: "Figura Poison Ivy",
    price: 100000,
    stock: 5,
    img: "img/poison.jpg"
  },
  {
    id: 9,
    name: "Sanji - One Piece",
    price: 2000,
    stock: 5,
    img: "img/sanji.jpg"
  },
  {
    id: 10,
    name: "Figura Spiderman",
    price: 5000,
    stock: 5,
    img: "img/spiderman.jpg"
  },
  {
    id: 11,
    name: "Nendoroid - Tanjiro Kamado",
    price: 20000,
    stock: 5,
    img: "img/tanjiro.jpg"
  },
  {
    id: 12,
    name: "Trunks - DBZ",
    price: 1800000,
    stock: 5,
    img: "img/trunks.jpg"
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
