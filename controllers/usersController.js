"use strict";

// Récupère le modèle Categories
const Users = require('../models/users');

// Utilise la méthode find() afin de récupérer tous les categories
exports.getUsers = (req, res, next) => {
  Users.find()
  .then(users => {
    res.status(200).json({
      users: users
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};`
`