import { Router } from "express";
import __dirname from "../utils.js";    
import productModel from "../service/models/products.js";
import CartManager from "../service/carts.service.js";

const router = Router();
const cartManager = new CartManager();

router.get('/products', async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    try {
        let result = await productModel.paginate({}, { page: page, limit: limit, lean: true });

        result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : "";

        result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : "";

        result.isValid = !(page <= 0 || page > result.totalPages);

        console.log(result);

        res.render('products', result);
    } catch (error) {
        console.error("Error en paginación:", error);
        res.status(500).send("Error al obtener productos paginados.");
    }   
})

router.get('/cart/:cid', async (req, res) => {
  try {
    let id = req.params.cid;
    let cart = await cartManager.getCartById(id);
    res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el carrito');
  }
});


export default router;