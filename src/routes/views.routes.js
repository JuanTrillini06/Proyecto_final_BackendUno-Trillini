import { Router } from "express";
import __dirname from "../utils.js";    
import productModel from "../service/models/products.js";
import CartManager from "../service/carts.service.js";

const router = Router();
const cartManager = new CartManager();

router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { category, minPrice, maxPrice, sort } = req.query;

  try {
    const pipeline = [];

    // Filtros dinámicos
    if (category) pipeline.push({ $match: { category } });

    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
      pipeline.push({ $match: { price: priceFilter } });
    }

    // Ordenamiento
    if (sort) {
      const direction = sort === 'asc' ? 1 : -1;
      pipeline.push({ $sort: { price: direction } });
    }

    // Paginar
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const [products, totalCount] = await Promise.all([
      productModel.aggregate(pipeline),
      productModel.countDocuments()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.render('products', {
      docs: products,
      page,
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/products?page=${page + 1}` : null,
      category,
      minPrice,
      maxPrice,
      sort
    });
  } catch (error) {
    console.error("Error en paginación:", error);
    res.status(500).send("Error al obtener productos paginados.");
  }
});

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