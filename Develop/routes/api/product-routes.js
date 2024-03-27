const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products with associated Category and Tag data
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category }, { model: Tag, through: ProductTag }],
        });
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single product by its id with associated Category and Tag data
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category }, { model: Tag, through: ProductTag }],
        });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        if (req.body.tagIds && req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return { product_id: newProduct.id, tag_id };
            });

            await ProductTag.bulkCreate(productTagIdArr);
        }

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT (update) a product by its id
router.put('/:id', async (req, res) => {
    try {
        await Product.update(req.body, { where: { id: req.params.id } });

        if (req.body.tagIds && req.body.tagIds.length) {
            const productTagsToRemove = await ProductTag.findAll({
                where: { product_id: req.params.id },
            });

            const productTagIds = productTagsToRemove.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => ({ product_id: req.params.id, tag_id }));

            await Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove.map(({ id }) => id) } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        }

        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a product by its id
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.destroy({ where: { id: req.params.id } });
        if (!deletedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;