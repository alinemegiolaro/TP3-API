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
exports.getProfilConnectedUser = (req, res, next) => {
  const userId = req.user.userId;
  Users.findById(userId)
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

// modifie l'utilisateur - putUsersById
exports.changeUsersById = (req, res, next) => {
  const userId = req.params.id;
  const loggedInUserId = req.user.userId;
  //Vérifier si l'utilisateur connecté est le même que celui dont l'ID est passé en paramètre
  if (userId !== loggedInUserId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  Users.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Mettre à jour les champs autorisés uniquement
      user.firstname = req.body.firstname;
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
  const userId = req.params.id;
  const loggedInUserId = req.user.userId;
  //Vérifier si l'utilisateur connecté est le même que celui dont l'ID est passé en paramètre
  if (userId !== loggedInUserId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  Users.findByIdAndRemove(userId)
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

exports.isAdmin = (id) => {
  Users.findById(id)
  .then(user => {
    if (!user.isAdmin) {
      return false;
    }
    return true;
  })
  .catch(err => {
    return false;
  });
}

