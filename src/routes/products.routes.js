import { Router } from "express";
import { uploader } from "../utils.js"
import __dirname from "../utils.js";    


const router = Router();
// FUNCIONES PARA TRABAJAR ARCHIVO JSON
import fs from 'fs';
import path from 'path';

// DIRECTORIO DEL ARCHIVO JSON
const filePath = path.join(__dirname, '/data/products.json');

// LEER PRODUCTOS
function readProducts() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
}

// ESCRIBIR PRODUCTOS
function writeProducts(products) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}



// GET

router.get('/', (req, res) => {
    let products = readProducts();
    res.send({status:"Succes", payload: products });
});


// GET PID

router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    let products = readProducts();

    let product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }

    res.send({ status: "Success", payload: product });
});


// POST
/* ESTRUCTURA DEL JSON
{
    "title": "",
    "description":"",
    "code":"",
    "price":,
    "stock":,
    "category":"",
    "tumbnails":""
}
*/
router.post('/', (req, res) => {
    let product = req.body;

    product.id = Math.floor(Math.random() * 1000 + 1);
    product.status = true;

    let products = readProducts();
    products.push(product);
    writeProducts(products);

    res.send({ status: "Success", payload: product });
});

// PUT
router.put('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    let updateData = req.body;

    let products = readProducts();
    let product = products.find(p => p.id === id);

    if (product === -1) {
        return res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }

    products[product] = { ...products[product], ...updateData, id: id };

    writeProducts(products);

    res.send({ status: "Success", payload: products[product] });
});

// DELETE
router.delete('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    let products = readProducts();

    let filteredProducts = products.filter(p => p.id !== id);

    if (filteredProducts.length === products.length) {
        return res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }

    writeProducts(filteredProducts);

    res.send({ status: "Success", message: `Producto con ID ${id} eliminado` });
});

export default router;