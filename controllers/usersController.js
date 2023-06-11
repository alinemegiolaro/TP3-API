"use strict";

// Récupère le modèle Categories
const Users = require('../models/users');

// retourne la liste des utilisateurs - getUsers
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
};

// retourne l'utilisateur - getUsersById
exports.getUsersById = (req, res, next) => {
  Users.findById(req.params.id)
  .then(user => {
    res.status(200).json({
      user: user
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};

// retourne les informations de l'utilisateur connecté - getUsersProfil
exports.getUsersProfil = (req, res, next) => {
  const userId = req.userId; 

  Users.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Utilisateur non trouvé');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// modifie l'utilisateur - putUsersById
exports.putUsersById = (req, res, next) => {
  console.log("Teste 1");
  console.log(req.params);
  console.log(req.body);
  const userId = req.params.id;
  console.log('USer: ' + userId);
  //const loggedInUserId = req.user.id; // Supposons que l'ID de l'utilisateur connecté soit accessible via req.user.id

  // Vérifier si l'utilisateur connecté est le même que celui dont l'ID est passé en paramètre
  // if (userId !== loggedInUserId) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  Users.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Mettre à jour les champs autorisés uniquement
      user.firstname = req.body.name;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.city = req.body.city;
      user.password = req.body.password;

      // Enregistrer les modifications de l'utilisateur
      return user.save();
    })
    .then(updatedUser => {
      res.status(200).json({ user: updatedUser });
    })
    .catch(err => {
      console.log(err.message);
      if (!err.statusCode) {        
        err.statusCode = 500;
      }
      next(err);
    });
};

// supprime l'utilisateur - deleteUsersById
exports.deleteUsersById = (req, res, next) => {
  Users.findByIdAndRemove(req.params.id)
  .then(user => {
    res.status(200).json({
      user: user
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};



