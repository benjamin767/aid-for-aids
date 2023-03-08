const jwt = require("jsonwebtoken"); 
const { User } = require("../../../db");
const { secret, expires } = process.env;
module.exports = {
    signin: async (email, password, name) => {
        if(!email || !password || !name) throw new Error("Faltan argumentos para crear usuario.");
        
        return await User.create({
            name,
            password,
            email
        }).then(user => {
            let token = jwt.sign({ user }, secret, {
                expiresIn: expires
            });
            return { user, token };
        });
    },
};