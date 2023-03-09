const express = require('express');
const router = express.Router();
const controllers = require('./controllers/Book');

router.get("/", async (req,res) => {
    const { page, limit, order_by, order_direction, q } = req.query;
    try {
        res.json(await controllers.getAllBooks(page, limit, q, order_by, order_direction));
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

router.post("/", async (req,res) => {
    const { isbn, title, price, stock, author, editorial } = req.body;
    try {
        const newBook = await controllers.createBook(isbn, title, price, stock, author, editorial);
        res.status(201).json(newBook);
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

router.put("/addStock", async (req,res) => {
    const { stock, id } = req.body;
    try {
        const msg = await controllers.updateStockFromBook(stock, id);
        res.send({ status: msg })
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = router;