const { Cart, Product, User, Book } = require("../../../db");
//const paginate = require("../utils/paginated");

module.exports = {
    createCart: async (total_products) => {
        if (!total_products || !total_products.length) throw new Error("Necesita productos para iniciar un carrito.");
        let total_amount = total_products.reduce((ac,prod)=> ac + prod.quantity * prod.price, 0);
        const cart = await Cart.create({
            total_amount,
            total_products
        });
        return cart;
    },
}