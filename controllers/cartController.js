"use strict";

// Récupère le modèle Categories
const Users = require('../models/users');
const Produits = require('../models/products');

// récupér tous les produits
exports.getCartConnectedUser = (req, res, next) => {
    const userId = req.user.userId;
    Users.findById(userId)
    .then(user => {
        res.status(200).json({
        cart: user.cart
        });
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
    });
}

//ajoute le produit au cart.
exports.ajouteProduitCart = (req, res, next) => {
    const userId = req.user.userId;
    const productId = req.body.productId;
    Produits.findById(productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        if (product.isSold) {
            return res.status(404).json({ message: "Produit déjà vendu" });
        }
        Users.findById(userId)
        .then(user => {
            user.cart.push(productId);
            user.save()
            product.isSold = true;
            product.save()
        })
    })
    .then(() => {
        res.status(201).json({
        message: 'Produit ajouté au cart!'
        });
    })
    .catch(err => {
        return res.status(500).json({ message: "Quelque chose n'a pas fonctionné!" });
    });
}

//supprime le produit.
exports.deleteProduitCart = (req, res, next) => {
    const userId = req.user.userId;
    const productId = req.params.id;
    Users.findById(userId)
    .then(user => {
        user.cart.pull(productId);
        user.save()
    })
    .then(() => {
        res.status(201).json({
        message: 'Produit supprimé du cart!'
        });
    })
    .catch(err => {
        return res.status(500).json({ message: "Quelque chose n'a pas fonctionné!" });
    });
}