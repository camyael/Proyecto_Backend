import mongoose from "mongoose";

const collection = 'Products'
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 1
    }
})

const productsModel = mongoose.model(collection, schema);

export default productsModel;