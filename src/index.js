import fs from 'fs'
const files = "./files";
const file = files + "/products.json";

let products = [];

class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.nameFile = file;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id;
  }

  async addProduct() {
    if (!fs.existsSync(files)){await fs.promises.mkdir(files, { recursive: true });
    await fs.promises.writeFile(file, JSON.stringify(products));}
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
        this.id = products.length;
        await fs.promises.writeFile(file, JSON.stringify(products));
      }
    }
      
      
  }

  static async getProducts() {
    
      if (fs.existsSync(file)){
        let string = await fs.promises.readFile(file, "utf-8");
      let content = JSON.parse(string);
      return content
      }
    
  }

  static async getProductById(id) {
    let string = await fs.promises.readFile(file, "utf-8");
    let content = JSON.parse(string);
    let found = content.find((el) => el.id == id);
    if (found) {
      return found
    } else {
      return("This product is unavailable. Please try another.")
    }
  }

  static async updateProduct(id, change, desc) {
    let string = await fs.promises.readFile(file, "utf-8");
    let content = JSON.parse(string);
    let found = content.find((el) => el.id == id);
    if (found) {
      if (change == "id") {
        console.log("ID's cannot be modified.");
      } else {
        found[change] = desc;
        products = content.filter((el) => el.id != id);
        products.push(found);
        await fs.promises.writeFile(file, JSON.stringify(products));
      }
    } else {
      console.log("Product cannot be updated, as it does not exist.");
    }
  }

  static async deleteProduct(id) {
    let string = await fs.promises.readFile(file, "utf-8");
    let content = JSON.parse(string);
    let found = content.find((el) => el.id == id);
    if (found) {
      let filter = content.filter((el) => el.id != id);
      products = filter;
      await fs.promises.writeFile(file, JSON.stringify(products));
    } else {
      console.log("Product cannot be deleted, as it does not exist.");
    }
  }

}

// ProductManager.getProducts();

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

const i5 = new ProductManager(

  "prueba 5",
  "esta es la prueba 5",
  700,
  "sin imagen",
  "abc504",
  455
);

// i1.addProduct();
// i2.addProduct();
// i3.addProduct();
// i4.addProduct();
// i5.addProduct();

// ProductManager.getProducts();

// ProductManager.getProductById(1);
// ProductManager.getProductById(5);

// ProductManager.updateProduct(1, "code", "abx333");
// ProductManager.updateProduct(8, "code", "abx333");

// setTimeout(() => {
//   ProductManager.deleteProduct(2);
//   ProductManager.deleteProduct(7);
// }, 2000);

export default ProductManager
