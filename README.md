# E-Commerce

El proyecto esta realizado en node js con express y sequelize con postgresql. Por el cual necesitamos configurarlo un poco.

## Configurar .env
* En la raiz del proyecto crear un archivo .env con los siguientes valores:
```
    #DB config
    DB_USER=usuario_pg
    DB_PASSWORD=contraseña_pg
    DB_HOST=localhost

    #Auth config
    secret=aidforaidscorp
    expires=24h
```
Donde usuario_pg es su usuario postgresy contraseña_pg es la contraseña de dicha cuenta.

Luego debemos crear en la shell o con el gestor que use, en postrgres, un base de datos llamada "aid".

Luego abrir una terminal en la raiz del proyecto o en src y ejecutar "npm i" o "npm install" para installar todas las dependencias correspondientes.

Una vez hecho todo esto en la terminal apuntando a src/ ejecutamos "npm start". desde aqui el proyecto deberia correr sin ningun problema, tal sea el caso verificar que los pasos anteriores fueran realizados correctamente.

### Metodos para Usuarios:
#### POST: /users/signin
* En esta ruta podremos crear un nuevo Usuario, debemos pasar por "body" valores llamado: 
```Donde:
    - email: email del usuario 
    - password: contraseña del usuario 
    - name: Nombre del usuario (Puede ser compuesto)
    - adress: Direccion (calle - altura) del usuario, 
    - picture: imagen de perfil (Este ultimo debera ser la ruta donde se aloja la imagen).
```
* Devolvera en formato JSON algunos datos de usuario junto con un token, este ultimo servira para manipular los datos de usuario.

#### POST: /users/login
* En esta ruta podremos "logear" con usuario registrado.
* Debemos pasar por "body" valores llamado: email y password.
* Devolvera en formato JSON algunos datos de usuario junto con un token, este ultimo servira para manipular los datos de usuario.

#### PUT: /users/update
* Prodemos actualizar datos como Direccion y Foto de perfil.
* Debemos pasar por "body" valores llamado: adress y o picture.
* y pasar por "headers" el token del usuario que querramos actualizar.
* Devuelve en formato JSON El usuario con sus nuevos datos y token.

### Metodos para Libros:
#### POST: /books
* Podremos crear un nuevo Libro pasando por "body" valores llamado: isbn, title, price, stock, author, editorial, distributor.
```  Donde:
    - isbn : es el codigo del libro,
    - title: titulo del mismo,
    - price: (Number) precio del libro
    - stock: (Number) numero de exitencias
    - author: autor del libro
    - distributor: de donde es que se adquirio dicho libro
```
* Devuelve el libro creado.

#### GET: /books
* Podremos obtener un libro o todos los libros que se encuentren disponibles con un paginado de 10 libros por paginas.
* Tambien podremos configurar dicho paginado pasando por "query" valores llamado: page, limit, order_by, order_direction, q.
``` Donde
    - page: es la pagina donde queres alojarte
    - limit: cantidad de libros por pagina
    - order_by: que propiedad del libro queres que se ordene
    - order_direction: de que manera se ordene estos libros: ("ASC": ascendente, "DESC": descendente)
    - q: busca cualquier coincidencia en el titulo de los libros.
``` 

#### PUT: /books/addStock
* Podremos sumar exitencias a un libro en concreto.
* Pasando valores por "body":
``` Donde:
    -id: Si pasamos este parametro estamos seguro de que el distribuidor es el mismo en principio.
    -stock: Cantidad de exitencias que queremos sumar.
    -isbn: Si no, debemos pasar este valor para referenciar un libro existente pero con distribuidor nuevo
    -distributor: El distribuidor del libro.
```
* Devolvera un mensaje, dando aviso de si la operación es exitosa o no.

### Metodos para Carrito:
#### POST: /carts
* Podremos crear un Carrito de compras.
* Pasando valores por "body" llamados:
```Donde:
    - total_products: debe ser un array con productos (Object-JSON) que tengan como obligatorio propiedades llamadas: 
        * id: será el id del producto
        * quantity: la cantidad de productos
        * price: el valor por unidad del prodcuto
        * stock: cantidad de exitencias del producto
    -  user_id: Debe ser el id de un usuario registrado.
```
* Devolvera un nuevo carrito de compras.

#### GET: /carts
* Obtendremos todos los carritos disponibles con un paginado de 10 carritos por pagina o uno en particular.
* para manipular paginado: 
``` Donde:
    - page: Pagina donde quieres alojarte 
    - limit: cantidad de carritos por paginas.
```
* Si queremos un carrito en concreto debemos pasar por "query" el id del carrito que deseamos obtener.

#### PUT: /carts
* Podremos agregar productos a un carrito exitente. 
* Para esto debemos pasar por "body" valores llamados: 
```Donde:
    - products: debe ser un array con productos (Object-JSON) que tengan como obligatorio propiedades llamadas: 
        * id: será el id del producto
        * quantity: la cantidad de productos
        * precio: el valor por unidad del prodcuto
    - cart_id: Debe ser el id de un carrito registrado.
```

### Metodos para Compras:
#### POST: /orders
* Aqui realizaremos las ordenes de compra.
* para esto se debe pasar por body valores llamados: 
```Donde: 
    - cart_id: debe ser el id de un carrito existente
    - user_id: Debe ser el id de un usuario registrado
```
* Devuelve la orden de compra en formato JSON.
