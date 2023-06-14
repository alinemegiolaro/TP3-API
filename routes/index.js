"use strict";

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');
const cartController = require('../controllers/cartController');
const isAuth = require('../middleware/is-auth');

// --------------Routes pour les produits-------------------------

// GET - retourne la liste de tous les produits
router.get('/products', productsController.getProducts);

// GET - retourne le produit.
router.get('/products/:id', productsController.getProductsById);

// POST - ajoute un produit.
router.post('/products', isAuth, productsController.postProducts);

// DELETE - supprime le produit.
router.delete('/products/:id', isAuth, productsController.deleteProductsById);

// GET - retourne la liste des produits vendus par l'utilisateur.
router.get('/products/user/:userId', productsController.getProductsByUserId);

// GET - retourne la liste des produits par parametre.
router.get('/search', productsController.searchProducts);
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
// GET - retourne les informations de l'utilisateur connecté.
router.get('/users/profil', isAuth, usersController.getProfilConnectedUser);

// /users => GET.
router.get('/users', usersController.getUsers);

// GET - retourne l'utilisateur.
router.get('/users/:id', usersController.getUsersById);

// PUT - modifie l'utilisateur.
router.put('/users/:id', isAuth, usersController.changeUsersById);

// DELETE - supprime l'utilisateur.
router.delete('/users/:id', isAuth, usersController.deleteUsersById);
//--------------------------------------------------------------

// --------------Routes pour le cart ---------------------------
// GET - retourne le panier de l'utilisateur connecté.
router.get('/cart', isAuth, cartController.getCartConnectedUser);

// PUT - ajoute un produit au panier de l'utilisateur connecté.
router.put('/cart', isAuth, cartController.ajouteProduitCart);

// DELETE - supprime un produit du panier de l'utilisateur connecté.
router.delete('/cart/:id', isAuth, cartController.deleteProduitCart);

//--------------------------------------------------------------

// Export des routes pour utilisation dans app.js
module.exports = router;
