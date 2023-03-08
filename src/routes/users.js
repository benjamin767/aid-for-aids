const express = require('express');
const router = express.Router();
const controllers = require('./controllers/User');

router.post("/signin", async (req,res) => {
    const { email, password, name, adress, picture } = req.body;
    try {
        const newUser = await controllers.signin(email,password,name,adress,picture);
        res.status(201).json(newUser);
    } catch(error) {
        res.send({ error: error.message });
    }
});

module.exports = router;