const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        editorial: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
};