const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../../db");
const { secret, expires } = process.env;
module.exports = {
    signin: async (email, password, name, adress, picture) => {
        if (!email || !password || !name) throw new Error("Faltan argumentos para crear usuario.");

        return await User.create({
            name,
            password,
            email,
            adress,
            picture
        }).then(user => {
            const payload = {
                id: user.id,
                name: user.name,
            };
            let token = jwt.sign(payload, secret, { expiresIn: expires });
            const userData = { 
                name: user.name,
                email: user.email, 
                adress: user.adress,
                picture: user.picture,
            };
            return { userData, token };
        });
    },
    login: async (email, password) => {
        if (!email || !password) throw new Error("Ingrese un email y contraseña.");
        return await User.findOne({
            where: { email }
        }).then(user => {
            let isPass = bcrypt.compareSync(password, user.password);
            if (!(user && isPass)) throw new Error("Usuario o contraseña incorrectos.");

            const payload = {
                id: user.id,
                name: user.name,
            };
            let token = jwt.sign(payload, secret, { expiresIn: expires });
            const userData = { 
                name: user.name,
                email: user.email, 
                adress: user.adress,
                picture: user.picture,
            };
            return {
                userData,
                token
            };
        });
    },
};