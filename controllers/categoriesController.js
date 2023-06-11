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
};

// GET - retourne la catégorie dont l'id est passé en paramètre.
exports.getCategoriesById = (req, res, next) => {
  Categories.findById(req.params.id)
  .then(category => {
    res.status(200).json({
      category: category
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
}

// user admin pour crée une nouvelle catégorie
exports.postCategories = (req, res, next) => {
  // Verification user
  if (req.user.role !== 'administrator') {
    return res.status(401).json({
      message: 'Seuls les administrateurs peuvent créer des catégories.'
    });
  }

  const category = new Categories({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  });

  category.save()
    .then(() => {
      res.status(201).json({
        message: 'Catégorie créée !'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}





