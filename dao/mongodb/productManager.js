const ProductModel = require('../models/productModel');
const { ObjectId } = require('mongoose').Types;

class ProductsManager {
    constructor() {
    }

    async readProductsFromDatabase() {
        try {
            return await ProductModel.find();
        } catch (error) {
            console.error("Error al leer productos de la base de datos:", error);
            throw error;
        }
    }

    async writeProductsToDatabase(products) {
        try {
            await ProductModel.insertMany(products);
        } catch (error) {
            console.error("Error al escribir productos en la base de datos:", error);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            const lastProduct = await ProductModel.findOne().sort({ _id: -1 });
            const lastProductObjectId = lastProduct ? lastProduct._id : null;
            product.code = `CODE${lastProductObjectId ? lastProductObjectId.toString().padStart(3, '0') : '001'}`;
            delete product.id;
            await ProductModel.create(product);
        } catch (error) {
            console.error("Error al agregar un producto:", error);
            throw error;
        }
    }

    async getProducts() {
        try {
            return await this.readProductsFromDatabase();
        } catch (error) {
            console.error("Error al obtener productos:", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const objectId = new ObjectId(id);
            return await ProductModel.findOne({ _id: objectId });
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const objectId = new ObjectId(id);
            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: objectId },
                { $set: updatedFields },
                { new: true }
            );

            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            throw error;
        }
    }

    async updateProductByCode(code, updatedFields) {
        try {
            const updatedProduct = await ProductModel.findOneAndUpdate(
                { code: code },
                { $set: updatedFields },
                { new: true }
            );

            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            throw error;
        }
    }


    async deleteProduct(id) {
        try {
            const objectId = new ObjectId(id);
            await ProductModel.deleteOne({ _id: objectId });
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    }

    async deleteProductByCode(code) {
        try {
            await ProductModel.findOneAndDelete({ code: code });
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    }
}




module.exports = ProductsManager;