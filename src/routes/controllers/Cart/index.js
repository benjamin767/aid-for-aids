const { Cart, Product, User, Book } = require("../../../db");
const paginate = require("../utils/paginated");

module.exports = {
    createCart: async (total_products, user_id) => {
        if (!total_products || !total_products.length) throw new Error("Necesita productos para iniciar un carrito.");
        if (!user_id) throw new Error("Necesita un usuario para crear carrito.");
        let total_amount = total_products.reduce((ac,prod)=> ac + prod.quantity * prod.price, 0);
        const cart = await Cart.create({
            total_amount,
            total_products
        });
        const products_id = total_products.map(prod => prod.id);
        await cart.addBooks(products_id);
        await cart.setUser(user_id);
        return cart;
    },
    getCart: async (cart_id) => {
        if(!cart_id) throw new Error("Faltan argumentos para realizar esa acción");
        const cart = await Cart.findOne({
            where: { id: cart_id},
            include: [
                {
                    model: User,
                },
                {
                    model: Book,
                },
            ],
        });
        if(!cart) throw new Error("No existe este carrito.");
        return cart;
    },
    getAllCarts: async (pageSize, pageLimit) => {
        const carts = await paginate(Cart, pageSize, pageLimit);
        return carts;
    }
}