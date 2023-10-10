const Cart = require('../models/cartModel');

// Función para crear un nuevo carrito
async function createCart(code) {
    try {
        const cart = new Cart({
            code,
            products: []
        });
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error al crear el carrito: ' + error.message);
    }
}

// Función para obtener un carrito por su código
async function getCartByCode(code) {
    try {
        const cart = await Cart.findOne({ code }).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    } catch (error) {
        throw new Error('Error al obtener el carrito: ' + error.message);
    }
}

// Función para agregar un producto a un carrito
async function addProductToCart(cartId, productId) {
    try {
        const cart = await Cart.findById(cartId).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products.push(productId);
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error al agregar producto al carrito: ' + error.message);
    }
}

module.exports = {
    createCart,
    getCartByCode,
    addProductToCart
};
