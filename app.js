const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const productsRoutes = require("./routes/products");
const rolesRoutes = require("./routes/roles");
const usersRoutes = require("./routes/users");
const sizesRoutes = require("./routes/sizes");
const picturesRoutes = require("./routes/pictures");
const articlesRoutes = require("./routes/articles");

// autorise tous à faire des requêtes
app.use(cors());

// Permet d'utiliser req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/products", productsRoutes);
app.use("/roles", rolesRoutes);
app.use("/users", usersRoutes);
app.use("/sizes", sizesRoutes);
app.use("/pictures", picturesRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/articles", articlesRoutes);

// Si ne trouve pas de routes alors erreurs => gestion de l'erreur
app.use((req, res, next) => {
  const error = new Error("Page doesn't exists");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports = app;
