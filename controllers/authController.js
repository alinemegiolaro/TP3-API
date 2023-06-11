"use strict";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/users');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error('Utilisateur non trouvée');
                error.statusCode = 404;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if(!isEqual) {
                const error = new Error('Mot de passe incorrect');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    firstName: loadedUser.firstName,
                    userId: loadedUser._id.toString(),
                    role: loadedUser.isAdmin,
                },
                process.env.SECRET_JWT,
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            next(err);
        })
};          

exports.signup = (req, res, next) => {
    const { firstName, lastName, email, city, password, isAdmin } = req.body;
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                city: city,
                password: hashedPassword,
                isAdmin: isAdmin,
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({Message: 'Utilisateur créé !', userId: result._id});
        })
        .catch(err => {
            next(err);
        });
};
