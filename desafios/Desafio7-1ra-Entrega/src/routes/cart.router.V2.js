const routerCart = require("express").Router();
const {
  createCart,
  deleteCart,
  addProductByCart,
  getProductsByCart,
  deleteProductByCart,
} = require("../controller/cart.controller");

// POST /api/carrito
routerCart.post("/", createCart);

// DELETE /api/carrito/id
routerCart.delete("/:cartId", deleteCart);

// POST /api/carrito/:cartId/productos
routerCart.post("/:cartId/productos", addProductByCart);

// GET /api/carrito/:id/productos
routerCart.get("/:id/productos", getProductsByCart);

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete("/:id/productos/:id_prod", deleteProductByCart);

module.exports = routerCart;
