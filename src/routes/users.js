const express = require('express');
const router = express.Router();
const controllers = require('./controllers/User');

router.post("/signin", async (req,res) => {
    const { email, password, name, adress, picture } = req.body;
    try {
        const newUser = await controllers.signin(email,password,name,adress,picture);
        res.status(201).json(newUser);
    } catch(error) {
        res.status(404).send({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await controllers.login(email,password);
        res.json(user)
    }catch(error) {
        res.status(404).send({ error: error.message });
    }
});

module.exports = router;