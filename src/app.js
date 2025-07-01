import express from "express";
import productRouter from "./routes/products.views.routes.js";
import cartRouter from "./routes/carts.routes.js";
import { readProducts } from "./service/products.manager.js"

import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import http from 'http';


import __dirname from "./utils.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set ("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = http.createServer(app); // ahora sí
const socketServer = new Server(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

console.log('Hola proyecto final');

app.use("/", productRouter);
app.use("/api/carts", cartRouter);

socketServer.on('connection', socket => {
  console.log('🔌 Cliente conectado a Socket.IO');
  const products = readProducts();
  socket.emit('productosActualizados', products);
});
