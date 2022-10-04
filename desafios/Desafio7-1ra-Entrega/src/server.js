const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routerProducts = require("./routes/product.router");
const routerCart = require("./routes/cart.router.V2");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCart);

const PORT = 8020;
console.log(`Port... ${process.env.TOKEN}`);
const server = app.listen(PORT, () => {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));
