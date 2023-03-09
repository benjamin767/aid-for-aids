const { Cart, Product, User, Book } = require("../../../db");
//const paginate = require("../utils/paginated");

module.exports = {
    createCart: async (total_products) => {
        if (!total_products || !total_products.length) throw new Error("Necesita productos para iniciar un carrito.");
        
    },
}