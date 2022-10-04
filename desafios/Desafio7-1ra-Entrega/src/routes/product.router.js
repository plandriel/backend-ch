const routerProducts = require("express").Router();
const Contenedor = require("../contenedor");
const authMiddleware = require("../middleware/authMiddleware");
const contenedor = new Contenedor("productos.json", [
  "timestamp",
  "title",
  "price",
  "description",
  "code",
  "image",
  "stock",
]);

// GET api/productos
routerProducts.get("/", async (req, res) => {
  const products = await contenedor.getData();
  res.status(200).json(products);
});

// GET api/productos/:id
routerProducts.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await contenedor.getById(id);

  product
    ? res.status(200).json(product)
    : res.status(400).json({ error: "product not found" });
});

// POST api/productos
routerProducts.post("/", authMiddleware, async (req, res, next) => {
  const { body } = req;
  // Consejo, para proximos proyectos en donde trabajes con base de datos, se aconseja pasar los datos
  // destructurados y no el req.body entero, por cuestiones de seguridad. Solo tomas del req.body los datos que sabes
  // que tenes que recibir
  body.timestamp = Date.now();
  const newProductId = await contenedor.save(body);
  newProductId
    ? res
        .status(200)
        .json({ success: "product added with ID: " + newProductId })
    : res
        .status(400)
        .json({ error: "invalid key. Please verify the body content" });
});

// PUT api/productos/:id
routerProducts.put("/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(req.body)
  const wasUpdated = await contenedor.updateById(id, body);

  wasUpdated
    ? res.status(200).json({ success: "product updated" })
    : res.status(404).json({ error: "product not found" });
});

// DELETE /api/productos/:id
routerProducts.delete("/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const wasDeleted = await contenedor.deleteById(id);

  wasDeleted
    ? res.status(200).json({ success: "product successfully removed" })
    : res.status(404).json({ error: "product not found" });
});

module.exports = routerProducts;
