const { Router } = require('express');
// Importar todos los routers;
const userMiddleware = require("./users");

const router = Router();

// Configurar los routers
router.use("/users", userMiddleware);

module.exports = router;