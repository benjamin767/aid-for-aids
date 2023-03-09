const express = require('express');
const router = express.Router();
const controllers = require('./controllers/Order');

router.post("/", async (req, res) => {
    const { cart_id, user_id } = req.body;
    try {
        const newOrder = await controllers.createOrder(cart_id, user_id);
        res.status(201).json(newOrder);
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = router;