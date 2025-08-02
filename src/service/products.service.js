import productModel from "./models/products.js"

export default class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts = async () => {
        const products = await productModel.find().lean()
        return products
    }

    addProduct = async (product) => {
        const {title, description, price, thumbnail, code, stock, category} = product
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            return console.log("Error: Todos los campos son obligatorios")
        }
        const productExist = await productModel.findOne({code: code})
        if (productExist) {
            return console.log("Error: El código ya existe")
        }
        const newProduct = await productModel.create(product)
        return newProduct
    }

    getProductById = async (id) => {
        const product = await productModel.findOne({_id: id})
        if (!product) {
            return console.log("Error: Producto no encontrado")
        }
        return product
    }

    updateProduct = async (id, product) => {
        const {title, description, price, thumbnail, code, stock, category} = product
        const productExist = await productModel.findOne({_id: id})
        if (!productExist) {
            return console.log("Error: Producto no encontrado")
        }
        const productUpdated = await productModel.updateOne({_id: id}, product)
        return productUpdated
    }

    deleteProduct = async (id) => {
        const product = await productModel.findOne({_id: id})
        if (!product) {
            return console.log("Error: Producto no encontrado")
        }
        const productDeleted = await productModel.deleteOne({_id: id})
        return productDeleted
    }

}