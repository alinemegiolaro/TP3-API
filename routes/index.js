"use strict";

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');

// /articles => GET
router.get('/products', productsController.getProducts);

router.get('/products/:id', productsController.getProductsById);

// /categories => GET
router.get('/categories', categoriesController.getCategories);

// /users => GET
router.get('/users', usersController.getUsers);

// Export des routes pour utilisation dans app.js
module.exports = router;
