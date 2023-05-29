"use strict";

// Récupère le modèle Categories
const Categories = require('../models/categories');

// Utilise la méthode find() afin de récupérer tous les categories
exports.getCategories = (req, res, next) => {
  Categories.find()
  .then(categories => {
    res.status(200).json({
      categories: categories
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};`
`