import express, { application } from "express";
import ProductManager from "./index.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const products = await ProductManager.getProducts();
  let { limit } = req.query;
  const limited = products.slice(0, limit)
  limit ? res.send(limited) : res.send(products)
});

app.get("/products/:pid", async (req, res) => {
  const product = await ProductManager.getProductById(req.params.pid);
  product ? res.send(product) :  res.send("nothing to see here");
});

app.listen(PORT, () => {
  console.log(`Este server corre mediante: ${PORT} `)
});
