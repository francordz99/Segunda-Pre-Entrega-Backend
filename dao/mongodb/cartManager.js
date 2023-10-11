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

async function addProductToCart(cartId, productId) {
    try {
        const cart = await Cart.findById(cartId).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Agregar el producto al array de productos
        cart.products.push(productId);
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error al agregar producto al carrito: ' + error.message);
    }
}

async function removeProductFromCart(cartId, productId) {
    try {
        const cart = await Cart.findById(cartId).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Remover el producto del array de productos
        cart.products = cart.products.filter(productIdInCart => productIdInCart.toString() !== productId);
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error al eliminar producto del carrito: ' + error.message);
    }
}

// Función para actualizar el carrito con un arreglo de productos
async function updateCart(cartId, products) {
    try {
        const cart = await Cart.findById(cartId).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Actualizar el array de productos con el nuevo arreglo
        cart.products = products.map(product => product.product_id);
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error al actualizar el carrito: ' + error.message);
    }
}

async function updateProductQuantity(cartId, productId, quantity) {
    try {
        const cart = await Cart.findById(cartId).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Encontrar el producto en el array de productos y actualizar la cantidad
        const productIndex = cart.products.findIndex(productInCart => productInCart.toString() === productId);
        if (productIndex !== -1) {
            cart.products[productIndex] = {
                product_id: productId,
                quantity: quantity
            };
            await cart.save();
            return cart;
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }
    } catch (error) {
        throw new Error('Error al actualizar la cantidad del producto: ' + error.message);
    }
}

// Función para eliminar todos los productos del carrito
async function removeAllProductsFromCart(cartId) {
    try {
        const cart = await Cart.findById(cartId).exec();
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Eliminar todos los productos del array
        cart.products = [];
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error('Error al eliminar todos los productos del carrito: ' + error.message);
    }
}

module.exports = {
    createCart,
    getCartByCode,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantity,
    removeAllProductsFromCart
};