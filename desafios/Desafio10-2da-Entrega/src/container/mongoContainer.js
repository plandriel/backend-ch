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

const { MongoClient, ObjectId } = require("mongodb");

class MongoContainer {
  constructor(connectionString, db, collect) {
    this.mongo = new MongoClient(connectionString);
    this.db = db;
    this.collect = collect;
  }
  async connect() {
    try {
      await this.mongo.connect();
      console.log("Connected to database");
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const data = await this.mongo
        .db(this.db)
        .collection(this.collection)
        .find({})
        .toArray();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getProductById(id) {
    try {
      const data = await this.mongo
        .db(this.db)
        .collection(this.collection)
        .findOne({
          _id: new ObjectId(id),
        });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async createProduct(data) {
    try {
      return await this.mongo
        .db(this.db)
        .collection(this.collection)
        .insertOne(data);
    } catch (error) {
      throw error;
    }
  }
  async updateProductById(id, data) {
    try {
      return await this.mongo
        .db(this.db)
        .collection(this.collection)
        .updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: data,
          }
        );
    } catch (error) {
      throw error;
    }
  }
  async deleteProductById(id) {
    try {
      return await this.mongo
        .db(this.db)
        .collection(this.collection)
        .deleteOne({
          _id: new ObjectId(id),
        });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MongoContainer;