const { Book } = require("../../../db");
const paginate = require("../utils/paginated");

module.exports= {
    createBook: async (isbn, title, price, stock, author, editorial) => {
        if(isbn, title, price, stock) throw new Error("Faltan argumentos para crear libro.");
        return await Book.create({
            isbn, 
            title, 
            price, 
            stock, 
            author, 
            editorial
        });
    },
    getAllBooks: async (pageSize, pageLimit, q, order_by, order_direction) => {
        if(pageLimit && pageSize){
            let order = [];
            let search = {};
            if(q) {
                search = {
                    where: {
                        title: {
                            [Op.like]: `%${q}%`
                        } 
                    }
                };
            }
            if(order_by && order_direction) order.push([order_by, order_direction]);
            return await paginate(Book, pageSize, pageLimit, search, order);
        }
        return await Book.findAll();
    },
}