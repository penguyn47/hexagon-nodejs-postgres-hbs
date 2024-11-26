const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const Product = db.define('product', {
    productName: {
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.STRING,
    },

    category: {
        type: DataTypes.STRING,
    },

    manufacturer: {
        type: DataTypes.STRING,
    },

    price: {
        type: DataTypes.DOUBLE,
    },

    stock_quanity: {
        type: DataTypes.INTEGER,
    },
},
    {
        timestamps: true, // Kích hoạt timestamps
    }
)

module.exports = Product;