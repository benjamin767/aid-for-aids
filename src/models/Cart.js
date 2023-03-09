const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('cart', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        total_products: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: [],
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },{
        timestamps: false,
    });
};