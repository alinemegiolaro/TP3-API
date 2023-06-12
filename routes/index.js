"use strict";

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');
const isAuth = require('../middleware/is-auth');

// --------------Routes pour les produits-------------------------

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

// --------------Routes pour les catégories---------------------
//  GET - retourne toutes les catégories.
router.get('/categories', categoriesController.getCategories);

// GET - retourne la catégorie par son id.
router.get('/categories/:id', categoriesController.getCategoriesById);

// POST - ajoute une catégorie.
router.post('/categories', isAuth, categoriesController.postCategories);

// PUT - modifie la catégorie.
router.put('/categories/:id', isAuth, categoriesController.putCategorieById);

// DELETE - supprime la catégorie.
router.delete('/categories/:id', isAuth, categoriesController.deleteCategorieById);
//--------------------------------------------------------------

// --------------Routes pour les utilisateurs-------------------
// /users => GET.
router.get('/users', usersController.getUsers);

// GET - retourne l'utilisateur.
router.get('/users/:id', usersController.getUsersById);

// GET - retourne les informations de l'utilisateur connecté.
router.get('/users/profil/:id', isAuth, usersController.getProfilConnectedUser);

// PUT - modifie l'utilisateur.
router.put('/users/:id', isAuth, usersController.changeUsersById);

// DELETE - supprime l'utilisateur.
router.delete('/users/:id', isAuth, usersController.deleteUsersById);
//--------------------------------------------------------------

// Export des routes pour utilisation dans app.js
module.exports = router;
