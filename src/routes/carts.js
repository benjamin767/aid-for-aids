const express = require('express');
const router = express.Router();
const controllers = require('./controllers/Cart');

router.post("/", async (req,res) => {
    const { total_products, user_id } = req.body;
    try {
        const newCart = await controllers.createCart(total_products, user_id);
        res.status(201).json(newCart);
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

router.get("/", async (req,res) => {
    const { cart_id, page, limit} = req.query;
    try {
        if(cart_id) {
            const cart = await controllers.getCart(cart_id); 
            return res.json(cart);
        }
        const carts = await controllers.getAllCarts(page, limit);
        res.json(carts)
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
})

router.put("/", async (req,res) => {
    const { products, cart_id } = req.body;
    try {
        const cart = await controllers.addProducts(products, cart_id);
        res.json(cart);
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = router;