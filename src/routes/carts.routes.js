import { Router } from "express";
import __dirname from "../utils.js";

const router = Router();

// FUNCIONES PARA TRABAJAR ARCHIVO JSON
import fs from 'fs';
import path from 'path';

// DIRECTORIO DEL ARCHIVO JSON
const filePath = path.join(__dirname, '/data/carts.json');

// LEER PRODUCTOS
function readCarts() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
}

// ESCRIBIR PRODUCTOS
function writeCarts(carts) {
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
}

// POST creacion del cart
/* ESTRUCTURA DEL JSON
{

}
*/
router.post('/', (req, res) => {
    const carts = readCarts();

    const newCart = {
        id: Math.floor(Math.random() * 10000 + 1),
        products: []
    };

    carts.push(newCart);
    writeCarts(carts);

    res.send({ status: "Success", payload: newCart });
});

// GET CID
router.get('/:cid', (req, res) => {
  let carts = readCarts();
  let cid = parseInt(req.params.cid);

  const cart = carts.find(c => c.id === cid);

  if (!cart) {
    return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
  }

  res.send({ status: 'Success', payload: cart.products });
});

// POST CID/PRODUCT/PID
/* ESTRUCTURA DEL JSON
{
    "cantidad":
}
*/
router.post('/:cid/product/:pid', (req, res) => {
  const carts = readCarts();
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const cantidad = parseInt(req.body.cantidad) || 1;

  const cart = carts.find(c => c.id === cid);

  if (!cart) {
    return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
  }

  const productInCart = cart.products.find(p => p.product === pid);

  if (productInCart) {
    productInCart.cantidad += cantidad;
  } else {
    cart.products.push({ product: pid, cantidad: cantidad });
  }

  writeCarts(carts);

  res.send({ status: 'Success', payload: cart });
});

export default router;