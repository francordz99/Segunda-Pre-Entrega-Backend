const express = require('express');
const router = express.Router();
const cartManager = require('../../dao/mongodb/cartManager');

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    const { code } = req.body;

    try {
        const cart = await cartManager.createCart(code);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un carrito por su código
router.get('/:code', async (req, res) => {
    const code = req.params.code;

    try {
        const cart = await cartManager.getCartByCode(code);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para agregar un producto a un carrito
router.put('/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    try {
        const cart = await cartManager.addProductToCart(cartId, productId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
