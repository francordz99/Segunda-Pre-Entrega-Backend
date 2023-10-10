const express = require('express');
const router = express.Router();
const ProductsManager = require('../../dao/mongodb/productManager');

const productsManager = new ProductsManager();

router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await productsManager.getProductById(req.params.pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado o inexistente.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newProduct = {
            title,
            description,
            code,
            price: Number(price),
            status: true,
            stock: Number(stock),
            category,
            thumbnails: thumbnails || [],
        };

        await productsManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto.' });
    }
});

router.put('/:productCode', async (req, res) => {
    try {
        const productCode = req.params.productCode;
        const updatedFields = req.body;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: 'Ningún campo proporcionado para actualizar.' });
        }

        // Llama a la función para actualizar por código
        await productsManager.updateProductByCode(productCode, updatedFields);
        res.status(200).json({ message: 'Producto actualizado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
});
router.delete('/by-code/:productCode', async (req, res) => {
    try {
        const productCode = req.params.productCode;

        await productsManager.deleteProductByCode(productCode);

        res.json({ message: 'Producto eliminado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
});


module.exports = router;
