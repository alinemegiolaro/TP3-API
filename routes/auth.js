"use strict";

const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// --------------Routes d'authentification et d'incription------
// /auth/login/ => POST
router.post('/login', authController.login);

// /auth/signup/ => POST
router.post('/signup', authController.signup);
//--------------------------------------------------------------

module.exports = router;