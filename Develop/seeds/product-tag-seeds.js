const { ProductTag } = require('../models');

const productTagData = [
    {
        productId: 1,
        tag_id: 6,
    },
    {
        productId: 1,
        tag_id: 7,
    },
    {
        productId: 1,
        tag_id: 8,
    },
    {
        productId: 2,
        tag_id: 6,
    },
    {
        productId: 3,
        tag_id: 1,
    },
    {
        productId: 3,
        tag_id: 3,
    },
    {
        productId: 3,
        tag_id: 4,
    },
    {
        productId: 3,
        tag_id: 5,
    },
    {
        productId: 4,
        tag_id: 1,
    },
    {
        productId: 4,
        tag_id: 2,
    },
    {
        productId: 4,
        tag_id: 8,
    },
    {
        productId: 5,
        tag_id: 3,
    },
];

const seedProductTags = () => ProductTag.bulkCreate(productTagData);

module.exports = seedProductTags;
