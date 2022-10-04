const fs = require("fs");

class Contenedor {
  constructor(fileName, keys) {
    this._filename = fileName;
    this._keys = [...keys, "id"];
    this._readFileOrCreateNewOne();
  }

  _validateKeysExist(newData) {
    const objectKeys = Object.keys(newData);
    let exists = true;

    objectKeys.forEach((key) => {
      if (!this._keys.includes(key)) {
        exists = false;
      }
    });
    return exists;
  }

  async _readFileOrCreateNewOne() {
    try {
      await fs.promises.readFile(this._filename, "utf-8");
    } catch (error) {
      error.code === "ENOENT"
        ? this._createEmptyFile()
        : console.log(
            `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
          );
    }
  }

  async _createEmptyFile() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(
            `File ${this._filename} was created since it didn't exist in the system`
          );
    });
  }

  async getById(id) {
    id = Number(id);
    try {
      const data = await this.getData();
      // const parsedData = JSON.parse(data);
      // cada vez que llamas a getData, lugo tenes que hacerle un parse, entonces te conviene hacer ese parse desde getData()
      const found = data.find((producto) => producto.id === id);
      return found;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to get an element by its ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      id = Number(id);
      const data = await this.getData();
      const objectIdToBeRemoved = data.find((producto) => producto.id === id);

      if (objectIdToBeRemoved) {
        const index = data.indexOf(objectIdToBeRemoved);
        data.splice(index, 1);
        await fs.promises.writeFile(this._filename, JSON.stringify(data));
        return true;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to delete an element by its ID (${id})`
      );
    }
  }

  async updateById(id, newData) {
    if (this._validateKeysExist(newData)) {
      try {
        id = Number(id);
        const data = await this.getData();
        const objectIdToBeUpdated = data.find((producto) => producto.id === id);
        if (objectIdToBeUpdated) {
          // como se  maneja por referencia, trabajamos directamente sobre el objeto que encontramos
          // entonces, primero obtenemos las keys
          const objectIdToBeUpdatedKeys= Object.keys(objectIdToBeUpdated)
          // dsp las recorremos
          objectIdToBeUpdatedKeys.forEach((key) => {
            // y preguntamos a cada una de esas keys, si existe dentro del objeto que nostros recibimos
            // para actualizar, si existe, reemplazamos el valor en esa key, sino no hace nada.
            if (newData.hasOwnProperty(key)){
              objectIdToBeUpdated[key]= newData[key]
            }
          });
          // Como se guarda por referencia, directamente escribrimos la info que hay data.
          await fs.promises.writeFile(this._filename, JSON.stringify(data));
          return true;
        } else {
          console.log(`ID ${id} does not exist in the file`);
          return null;
        }
      } catch (error) {
        `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`;
      }
    } else {
      return false;
    }
  }

  async addToArrayById(id, objectToAdd) {
    try {
      if (this._validateKeysExist(objectToAdd)) {
        id = Number(id);
        const { products } = objectToAdd;
        //El producto llega dentro de una propiedad 'products' que utilizas para la validacion
        const data = await this.getData();
        // const objectIdToBeUpdated = data.find(
        //   (producto) => producto.id === id
        // ); 
        // Que el producto exista, ya se verifica en el controller, cuando haces el getById()
        const index = data.findIndex((cart) => cart.id == id);
        // findIndex retorna -1 si no encuentra
        if (index >= 0) {
          // En este caso tenemos que armar el objeto que vamos a agregar, porque recibimos algo asi:
          /**
           objectToAdd: {
              products:{
                title:...
                price:...
                etc...
                }
           }
           */
          const productToAdd = {
            title: products.title,
            price: products.price,
            description: products.description,
            code: products.code,
            image: products.image,
            stock: products.stock,
            timestamp: products.timestamp,
            id: products.id,
          };
          data[index].products.push(productToAdd);
          // Como van por referencia, podemos trabajar directamente sobre el objeto o el array
          /**
           entonces como data es nuestro arreglo de carritos, decimos que, queremos pararnos sobre el que esta en la posicion index
           y sobre ese carrito accedemos a la propiedad products, y como es un arreglo directamente hacemos push() de lo que queremos agregar.
           */
          const dataString = JSON.stringify(data);
          // pasamos a string y guardamos el archivo con la info modificada.
          fs.writeFileSync(this._filename, dataString);
          return true;
        } else {
          console.log(`ID ${id} does not exist in the file`);
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`;
    }
  }

  async removeFromArrayById(id, objectToRemoveId, keyName) {
    try {
      id = Number(id);
      const data = await this.getData();
      const objectIdToBeUpdated = data.find((producto) => producto.id === id);

      if (objectIdToBeUpdated) {
        const index = data.indexOf(objectIdToBeUpdated);

        const valorActual = data[index][keyName];
        let indexToBeRemoved = -1;
        valorActual.forEach((element, indexE) => {
          if (element.id == objectToRemoveId) {
            indexToBeRemoved = indexE;
          }
        });
        const newArray = [...valorActual];

        if (indexToBeRemoved > -1) {
          console.log(indexToBeRemoved);
          newArray.splice(indexToBeRemoved, 1);
        }

        data[index][keyName] = newArray;
        await fs.promises.writeFile(this._filename, JSON.stringify(data));
        return true;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return false;
      }
    } catch (error) {
      `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`;
    }
  }

  async save(object) {
    if (this._validateKeysExist(object)) {
      try {
        const allData = await this.getData();
        object.id = allData.length + 1;
        allData.push(object);

        await fs.promises.writeFile(this._filename, JSON.stringify(allData));
        return object.id;
      } catch (error) {
        console.log(
          `Error Code: ${error.code} | There was an error when trying to save an element`
        );
      }
    } else {
      return false;
    }
  }

  async deleteAll() {
    try {
      await this._createEmptyFile();
    } catch (error) {
      console.log(
        `There was an error (${error.code}) when trying to delete all the objects`
      );
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  }

  // este metodo no se utiliza
  // async getAll() {
  //   const data = await this.getData();
  //   return JSON.parse(data);
  // }
}

module.exports = Contenedor;
