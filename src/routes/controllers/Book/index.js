const { Book } = require("../../../db");
const paginate = require("../utils/paginated");

module.exports= {
    createBook: async (isbn, title, price, stock, author, editorial, distributor) => {
        if(!isbn || !title || !price || !stock || !distributor) throw new Error("Faltan argumentos para crear libro.");
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
    updateStockFromBook: async (addStock, id) => {
        if(!addStock || !id) throw new Error("Faltan argumentos para realizar esta acción.");
        if(addStock <= 0) throw new Error("Para sumar el stock debe ingresar un número mayor a 0.");
        const book = await Book.findOne({ where: { id } });
        let stock = book.stock + addStock;
        await Book.update({
            stock
        }, {
            where: {
                id
            }
        });
        return "¡Stock actualizado con éxito!"
    },
}