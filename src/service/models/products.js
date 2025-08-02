import mongoose from "mongoose"
import mongoosePaginate from "mongoose-aggregate-paginate-v2"

const productCollection = "products";

const StingUnicoRequerido = {
    type: String,
    unique: true,
    required: true
};

const StringNoUnicoRequerido = {
    type: String,
    required: true
};

const productSchema = new mongoose.Schema({
    title: StringNoUnicoRequerido,
    description: StringNoUnicoRequerido,
    price: Number,
    thumbnail: String,
    code: StingUnicoRequerido,
    stock: Number,
    status: Boolean,
    category: StringNoUnicoRequerido
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema)
export default productModel;
