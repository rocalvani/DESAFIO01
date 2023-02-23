const products = [];

class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id;
  }

  addProduct() {
    let found = products.find((i) => i.code == this.code);
    if (found) {
      console.log("cannot push products with the same code ");
    } else {
      if (
        this.title == undefined ||
        this.description == undefined ||
        this.price == undefined ||
        this.stock == undefined ||
        this.code == undefined ||
        this.thumbnail == undefined
      ) {
        console.log("product is incomplete");
      } else {
        products.push(this);
      }
    }
    this.id = products.length;
  }

  static getProducts() {
    return products;
  }

  static getProductById(id) {
    let found = products.find((el) => el.id == id);
    if (found) {
      return found;
    } else {
      return "item not found";
    }
  }
}

console.log(ProductManager.getProducts());

const i1 = new ProductManager(
  "prueba 1",
  "esta es la prueba 1",
  200,
  "sin imagen",
  "abc444",
  24
);
const i2 = new ProductManager(
  "prueba 2",
  "esta es la prueba 2",
  600,
  "sin imagen",
  "abc594",
  24
);
const i3 = new ProductManager(
  "prueba 3",
  "esta es la prueba 3",
  800,
  "sin imagen",
  "abc444",
  24
);

const i4 = new ProductManager("prueba 4", "esta es la prueba 4");


i1.addProduct();
i2.addProduct();
i3.addProduct();
i4.addProduct();

console.log(ProductManager.getProducts());

console.log(ProductManager.getProductById(1));
console.log(ProductManager.getProductById(5));
