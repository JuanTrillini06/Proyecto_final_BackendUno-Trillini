import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set ("views", __dirname + "/views");
app.set("view engine", "handlebars");



app.use("/api/products", productRouter);
app.use("/", cartRouter);
app.use("/", viewsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});


const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://juantrillini51:HKRHTqdNG3UVJ56A@backenduno.nc1xfxj.mongodb.net/Proyecto-final?retryWrites=true&w=majority&appName=BackendUno");
    console.log("Conectado con exito a MongoDB usando Moongose.");
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};
connectMongoDB()