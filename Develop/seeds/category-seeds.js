const { Category } = require('../models');

const categoryData = [
    {
        name: 'Shirts',
        description: 'Clothing items for upper body'
    },
    {
        name: 'Shorts',
        description: 'Clothing items for lower body'
    },
    {
        name: 'Music',
        description: 'Various music items'
    },
    {
        name: 'Hats',
        description: 'Headwear accessories'
    },
    {
        name: 'Shoes',
        description: 'Footwear items'
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
