import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const PORT = 8080;

console.log('Hola proyecto final');

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});