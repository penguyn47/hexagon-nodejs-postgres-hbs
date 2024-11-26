const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
    },

    firstName: {
        type: DataTypes.STRING,
    },

    lastName: {
        type: DataTypes.STRING,
    },

    url: {
        type: DataTypes.STRING,
        defaultValue: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },

    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        timestamps: true, // Kích hoạt timestamps
    }
)

module.exports = User;