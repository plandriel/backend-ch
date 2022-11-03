/*
Aca iria la class MongoContainer con el constructor que recibe la coleccion y el schema
Y tendrias los metodos getAll, getById, craete, etc 

Luego, en la carpeta dao, vas a tener una carpeta para productos y otra para carritos. Dentro de cada una de ellas 
vas a tener un archivo dao para cada base de datos, es decir, vas a tener productMongoDAO, productFirebaseDAO, productFileDAO, productMemDAO.
(Lo mismo para carrito)

Cada uno de esos archivos, va a ser una extension, de la clase que tenemos en este contenedor por ejemplo:
en container/mongoContainer.js(este archivo) vas a tener:
    class MongoContainer {
        constructor( collect, objSchema ) { }
    }
y dentro de dao/productMongoDAO vas a tener:
    class ProductsDaoMongo extends MongoContainer {
        constructor() {
            super( "products", productSchema );
        }
    }
*/