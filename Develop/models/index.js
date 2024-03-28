// Import Sequelize and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); // Assuming you have a database configuration file

// Define Product model
class Product extends Model { }
Product.init(
    {
        // Define columns for the Product model
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

    },
    {
        sequelize,
        modelName: 'product',
        timestamps: false,
    }
);

// Define Category model
class Category extends Model { }
Category.init(
    {
        // Define columns for the Category model
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },


    },
    {
        sequelize,
        modelName: 'category',
        timestamps: false,
    }
);

// Define Tag model
class Tag extends Model { }
Tag.init(
    {
        // Define columns for the Tag model
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

    },
    {
        sequelize,
        modelName: 'tag',
        timestamps: false,
    }
);

// Define ProductTag model for the many-to-many relationship
class ProductTag extends Model { }
ProductTag.init(
    {
        // No need to define columns if it's just a through table
    },
    {
        sequelize,
        modelName: 'product_tag',
        timestamps: false,
    }
);

// Set up associations
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsToMany(Tag, { through: ProductTag });
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = { Product, Category, Tag, ProductTag };
