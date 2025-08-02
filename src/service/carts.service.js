import {cartModel} from "./models/carts.js"

export default class CartManager {
    constructor() {
        this.carts = []
    }

    getCartById = async (id) => {
        const cart = await cartModel.findById(id).populate('products.productId').lean()
        if (!cart) {
            return console.log("Error: Carrito no encontrado")
        }
        return cart
    }

    createCart = async (cart) => {
        const {productId, quantity} = cart
        const cartCreated = await cartModel.create({products: [{productId, quantity}]
        });
        return cartCreated
    }

    updateCart = async (id, { productId, quantity }) => {
        const cart = await cartModel.findById(id);
        if (!cart) throw new Error("Carrito no encontrado");

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        return cart;
    }

    deleteCart = async (id) => {
        const cart = await cartModel.findOne({_id: id})
        if (!cart) {
            return console.log("Error: Carrito no encontrado")
        }
        const cartDeleted = await cartModel.deleteOne({_id: id})
        return cartDeleted
    }
}