"use strict";

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');

// GET - retourne la liste de tous les produits
router.get('/products', productsController.getProducts);

// GET - retourne le produit.
router.get('/products/:id', productsController.getProductsById);

// POST - ajoute un produit.
router.post('/products', productsController.postProducts);

// DELETE - supprime le produit.
router.delete('/products/:id', productsController.deleteProductsById);

// GET - retourne la liste des produits vendus par l'utilisateur.
router.get('/products/users/usersId', productsController.getProductsByUserId);
//--------------------------------------------------------------

//  /categories => GET
router.get('/categories', categoriesController.getCategories);



//--------------------------------------------------------------
// /users => GET.
router.get('/users', usersController.getUsers);

// GET - retourne l'utilisateur.
router.get('/users/:id', usersController.getUsersById);

// GET - retourne les informations de l'utilisateur connecté.
// router.get('/users/profil', usersController.getUsersProfil);

// PUT - modifie l'utilisateur.
router.put('/users/:id', usersController.putUsersById);

// DELETE - supprime l'utilisateur.
router.delete('/users/:id', usersController.deleteUsersById);

// Export des routes pour utilisation dans app.js
module.exports = router;
