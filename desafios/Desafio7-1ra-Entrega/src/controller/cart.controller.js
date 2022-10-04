const Contenedor = require("../contenedor");
const carrito = new Contenedor("carrito.json", ["timestamp", "products"]);
const contenedor = new Contenedor("productos.json", [
  "timestamp",
  "title",
  "price",
  "description",
  "code",
  "image",
  "stock",
]);

const createCart = async (req, res) => {
  const newCart = { timestamp: Date.now(), products: [] };
  const newCartId = await carrito.save(newCart);
  newCartId
    ? res.status(200).json({ success: "cart added with ID: " + newCartId })
    : res
        .status(400)
        .json({ error: "invalid key. Please verify the body content" });
};

const deleteCart = async (req, res) => {
  const { cartId } = req.params;
  const wasDeleted = await carrito.deleteById(cartId);

  wasDeleted
    ? res.status(200).json({ success: "cart successfully removed" })
    : res.status(404).json({ error: "cart not found" });
};

// const addProductByCart = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   const product = await contenedor.getById(body["id"]);

//   if (product) {
//     const cartExist = await carrito.addToArrayById(id, { products: product });
//     cartExist
//       ? res.status(200).json({ success: "product added" })
//       : res.status(404).json({ error: "cart not found" });
//   } else {
//     res.status(404).json({
//       error: "product not found, verify the ID in the body content is correct.",
//     });
//   }
// };

const addProductByCart = async (req, res) => {
  // te recomiendo personalizar lo mejor que sea posible el nombre de las variables, argumentos y parametros.
  // si se recibe un id, tratar de indicar de que es ese id
  // para que sea mas legible el codigo.
  const { cartId } = req.params;
  const { productId } = req.body;
  const product = await contenedor.getById(productId);
  if (product) {
    const cartExist = await carrito.addToArrayById(cartId, {
      products: product,
    });
    cartExist
      ? res.status(200).json({ success: "product added" })
      : res
          .status(404)
          .json({ error: "Something went wrong. Validations error" });
  } else {
    res.status(404).json({
      error: "product not found, verify the ID in the body content is correct.",
    });
  }
};

const getProductsByCart = async (req, res) => {
  const { id } = req.params;
  const cart = await carrito.getById(id);
  console.log({ cart });
  cart
    ? res.status(200).json(cart.products)
    : res.status(404).json({ error: "cart not found" });
};

const deleteProductByCart = async (req, res) => {
  const { id, id_prod } = req.params;
  const productExists = await contenedor.getById(id_prod);
  if (productExists) {
    const cartExists = await carrito.removeFromArrayById(
      id,
      id_prod,
      "products"
    );
    cartExists
      ? res.status(200).json({ success: "product removed" })
      : res.status(404).json({ error: "cart not found" });
  } else {
    res.status(404).json({ error: "product not found" });
  }
};

module.exports = {
  createCart,
  deleteCart,
  addProductByCart,
  getProductsByCart,
  deleteProductByCart,
};
