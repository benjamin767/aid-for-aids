const express = require('express');
const router = express.Router();
const controllers = require('./controllers/Cart');

router.post("/", async (req,res) => {
    const { total_products } = req.body;
    try {
        const newCart = await controllers.createCart(total_products);
        res.status(201).json(newCart);
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = router;