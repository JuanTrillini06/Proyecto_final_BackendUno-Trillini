import { Router } from "express";
import __dirname from "../utils.js";    
import ProductManager from "../service/products.service.js";

const router = Router();
const productManager = new ProductManager();

// GET ALL

router.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.send({ status: 'success', payload: products })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error al obtener los productos' });   
    }
});

// GET PID

router.get('/:pid', async (req, res) => {
    try {
        let id = req.params.pid;
        let product = await productManager.getProductById(id);
        res.send({ status: 'success', payload: product })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error al obtener el producto' });   
    }
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
router.post('/', async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        let product = await productManager.addProduct(data)
        res.send({ status: 'success', payload: product })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error al agregar el producto' });
    }
});

// PUT
router.put('/:pid', async (req, res) => {
    try {
        let id = req.params.pid;
        let data = req.body;

        let updateProduct = await productManager.updateProduct(id, data);
        res.send({ status: 'success', payload: updateProduct })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error al actualizar el producto' });
    }
});

// DELETE
router.delete('/:pid', async (req, res) => {
    try {
        let id = req.params.pid;

        let deleteProduct = await productManager.deleteProduct(id);
        res.send({ status: 'success', payload: "Producto eliminado correctamente" })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error al eliminar el producto' });
    }
});

export default router;