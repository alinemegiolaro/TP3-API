"use strict";

// Récupère le modèle Products
const Products = require('../models/products');

// récupér tous les produits
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

// Utilise la méthode findById() afin de récupérer un produit
exports.getProductsById = (req, res, next) => {
  Products.findById(req.params.id)
  .then(product => {
    res.status(200).json({
      product: product
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};

//crée un nouveau produit à vendre.
exports.postProducts = (req, res, next) => {
  const { id, title, description, price, categoryId, imageURL, userId, isSold, updatedAt, createdAt } = req.body;
  console.log('Message 1');
  console.log(title);
  console.log('Message 2');
  console.log(description);
  console.log('Message 3');
  console.log(price);
  console.log('Message 4');
  const product = new Products({
    title: title,
    description: description,
    price: price,
    categoryId: categoryId,
    userId: userId,
    isSold: isSold,
    updatedAt: updatedAt,
    createdAt: createdAt
  });
  console.log('Message 4.5');
  product.save()
  .then(() => {
    res.status(201).json({
      message: 'Product created successfully!'
    });
  })
  .catch(err => {
    if (!err.statusCode) {      
      err.statusCode = 500;
    }
  });
}

//supprime le produit.
exports.deleteProductsById = (req, res, next) => {
  Products.findById(req.params.id)
  .then(product => {
    product.delete();
    res.status(200).json({
      message: 'Product deleted successfully!'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
}

//retourne la liste des produits vendus par l'utilisateur.
exports.getProductsByUserId = (req, res, next) => {
  Products.find({userId: req.params.userId})
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
}
