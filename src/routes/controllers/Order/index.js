const { Cart, User, Order} = require("../../../db");
const paginate = require("../utils/paginated");

module.exports = {
    createOrder: async (cart_id, user_id) => {
        if(!cart_id || !user_id) throw new Error("Faltan argumentos para realizar esta acción.");
        let cart = await Cart.findByPk(cart_id);
        cart.total_products.map(prod => {
            if(prod.quantity - prod.stock <= 0) throw new Error("No se puede realizar compra ya que no hay stock suficiente."); 
        });
        
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