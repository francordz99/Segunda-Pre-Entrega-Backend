const express = require('express');
const router = express.Router();
const cartManager = require('../../dao/mongodb/cartManager');
const ProductModel = require('../../dao/models/productModel');

router.post('/', async (req, res) => {
    const { code } = req.body;

    try {
        const cart = await cartManager.createCart(code);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:code', async (req, res) => {
    const code = req.params.code;

    try {
        const cart = await cartManager.getCartByCode(code);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

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

router.delete('/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    try {
        const cart = await cartManager.removeProductFromCart(cartId, productId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    const products = req.body.products;

    try {
        const cart = await cartManager.updateCart(cartId, products);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    try {
        const cart = await cartManager.updateProductQuantity(cartId, productId, quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const cart = await cartManager.removeAllProductsFromCart(cartId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
