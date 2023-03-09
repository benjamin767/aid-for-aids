const { Cart, User, Order, Book } = require("../../../db");
const paginate = require("../utils/paginated");

module.exports = {
    createOrder: async (cart_id, user_id) => {
        if(!cart_id || !user_id) throw new Error("Faltan argumentos para realizar esta acción.");
        let cart = await Cart.findByPk(cart_id);
        cart.total_products.map(prod => {
            if(parseInt(prod.stock) - parseInt(prod.quantity)  <= 0){
                throw new Error("No se puede realizar compra ya que no hay stock suficiente."); 
            } 
        });

        let products = cart.total_products.map(prod => ({id: prod.id, quantity: prod.quantity})); 
        for(let prod of products) {
            let book = await Book.findByPk(prod.id);
            let stock = book.stock - prod.quantity;
            await Book.update({
                stock
            },{
                where: { id: prod.id },
            });
        }
        let order = await Order.create({
            total_amount: cart.total_amount,
        });
        await order.addCarts(cart.id);
        await order.setUser(user_id);

        return await Order.findOne({
            where: { id : order.id },
            include: [
                {
                    model: Cart,
                },
            ],
        });
    },
}