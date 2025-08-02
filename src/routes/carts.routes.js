import { Router } from "express";
import __dirname from "../utils.js";
import CartManager from "../service/carts.service.js";

const router = Router();
const cartManager = new CartManager();



// POST creacion del cart y carga
/* ESTRUCTURA DEL JSON
{
    ProductId:"",
    Quantity:
}
*/
router.post('/api/carts', async (req, res) => {
    try {
      let data = req.body;
      console.log(data)
      let cart = await cartManager.createCart(data)
      res.send({ status: 'success', payload: cart, cartId: cart._id })
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', error: 'Error al agregar el carrito' });
    }
});

// GET CID
router.get('/api/carts/:cid', async (req, res) => {
  try {
    let id = req.params.cid;
    let cart = await cartManager.getCartById(id);
    res.send({ status: 'success', payload: cart })
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al obtener el carrito' });
  }
});

// PUT CID
router.put('/api/carts/:cid', async (req, res) => {
  try {
    let id = req.params.cid;
    let data = req.body;
    let cart = await cartManager.updateCart(id, data);
    res.send({ status: 'success', payload: cart })
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al actualizar el carrito' });
  }
});

// DELETE CID
router.delete('/api/carts/:cid', async (req, res) => {
  try {
    let id = req.params.cid;
    let cart = await cartManager.deleteCart(id);
    res.send({ status: 'success', payload: cart })
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al eliminar el carrito' });
  }
});

export default router;
