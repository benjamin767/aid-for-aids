const { Book } = require("../../../db");
const paginate = require("../utils/paginated");
const { Op } = require("sequelize");

module.exports = {
    createBook: async (isbn, title, price, stock, author, editorial, distributor) => {
        if (!isbn || !title || !price || !stock || !distributor) throw new Error("Faltan argumentos para crear libro.");
        return await Book.create({
            isbn,
            title,
            price,
            stock,
            author,
            editorial,
            distributor
        });
    },
    getAllBooks: async (pageSize, pageLimit, q, order_by, order_direction) => {
        let order = [];
        let search = {};
        if (q) {
            search = {
                where: {
                    title: {
                        [Op.like]: `%${q}%`
                    }
                }
            };
        }
        if (order_by && order_direction) order.push([order_by, order_direction]);
        return await paginate(Book, pageSize, pageLimit, search, order);
        
    },
    updateStockFromBook: async (addStock, id, isbn, distributor) => {
        if (!addStock) throw new Error("Faltan argumentos para realizar esta acción.");
        if (addStock <= 0) throw new Error("Para sumar el stock debe ingresar un número mayor a 0.");
        let book;
        if (id) {
            book = await Book.findOne({ where: { id } });
            if (!book) throw new Error("Este libro no se encuentra en el inventario.");
            let stock = book.stock + addStock;
            await Book.update({
                stock
            }, {
                where: {
                    id
                }
            });
        }
        else if (isbn) {
            book = await Book.findOne({ where: { isbn } });
            if (!book) throw new Error("Este libro no se encuentra en el inventario.");
            await Book.create({
                isbn,
                title: book.title,
                price: book.price,
                stock: addStock,
                author: book.author,
                editorial: book.editorial,
                distributor
            });
        }
        else throw new Error("Faltan argumentos para realizar esta acción.");
        return "¡Stock actualizado con éxito!"
    },
}