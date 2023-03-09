const { Router } = require('express');
// Importar todos los routers;
const userMiddleware = require("./users");
const bookMiddleware = require("./books");
const cartMiddleware = require("./carts");
const orderMiddleware = require("./orders");

const router = Router();

// Configurar los routers
router.use("/users", userMiddleware);
router.use("/books", bookMiddleware);
router.use("/carts", cartMiddleware);
router.use("/orders", orderMiddleware);

module.exports = router;