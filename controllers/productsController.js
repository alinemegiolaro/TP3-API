"use strict";

// Récupère le modèle Products
const Products = require('../models/products');

// Utilise la méthode find() afin de récupérer tous les produits
exports.getProducts = (req, res, next) => {
  Products.find()
  .then(products => {
    res.status(200).json({
      products: products
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};
