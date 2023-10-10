const mongoose = require('mongoose');

const { Schema } = mongoose;
const productsCollection = "products";

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
});

const ProductModel = mongoose.model(productsCollection, productSchema);

module.exports = ProductModel;
