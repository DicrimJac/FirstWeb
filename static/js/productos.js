
// ====== PRODUCT STORAGE LAYER ======
const PROD_KEY = "APP_PRODUCTS";

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
