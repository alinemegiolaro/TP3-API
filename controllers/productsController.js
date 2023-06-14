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
  const { id, title, description, price, categoryId, imageURL } = req.body;
  const loggedInUserId = req.user.userId;
  const product = new Products({
    title: title,
    description: description,
    price: price,
    categoryId: categoryId,
    userId: loggedInUserId
  });
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
  const loggedInUserId = req.user.userId;
  //Vérifier si l'utilisateur connecté est le même que celui dont l'ID est passé en paramètre
  Products.findById(req.params.id)
  .then(product => {
    //Vérifier si l'utilisateur connecté est le même que celui dont l'userID du produit
    if (product.userId !== loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    } 
    Products.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({
      message: 'Product deleted successfully!'
      });
    })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
}

//retourne la liste des produits vendus par l'utilisateur.
exports.getProductsByUserId = (req, res, next) => {
  console.log(req.params.userId);
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

exports.searchProducts = (req, res, next) => {
  console.log(req.query.q)
  const param = req.query.q //'/.*' + req.query.q + '.*/'
  console.log(param)
  console.log('/.*Vintage.*/')
  Products.find({title: param})
  .then(products => {
    console.log(products)
    if (!products) {
      return res.status(401).json({ message: "Product don't found!" });
    }
    res.status(200).json({
      products: products
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      return res.status(500).json({ message: "Something didn't work!" });
    }
  });
}
