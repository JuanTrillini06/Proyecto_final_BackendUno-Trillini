import mongoose from "mongoose"

const cartCollection = "carts";

const StingUnicoRequerido = {
    type: String,
    unique: true,
    required: true
};

const StringNoUnicoRequerido = {
    type: String,
    required: true
};

const arrayRequired = {
    type: [String],
    required: true
};

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
    });

export const cartModel = mongoose.model(cartCollection, cartSchema)