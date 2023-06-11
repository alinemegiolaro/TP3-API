const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {    
        type: String,
        required: [true, "Le prénom est requis !"],
        minlength: [3, "Le prénom doit avoir au moins 3 caractères"],
        maxlength: [50, "Le prénom ne doit pas dépasser 50 caractères"]
    },
    lastname: {    
        type: String,
        required: [true, "Le prénom est requis !"],
        minlength: [3, "Le prénom doit avoir au moins 3 caractères"],
        maxlength: [50, "Le prénom ne doit pas dépasser 50 caractères"]
    },
    email: {
        type: String,
        required: [true, "L'email est requis !"],
        maxlength: [50, "L'email ne doit pas dépasser 50 caractères"],
        unique: true,
        validate: {
          validator: function (value) {
            // Regex para validar o formato do e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: "L'email doit être au format valide"
        }
    },
    city: {
        type: String,
        required: [true, "La ville est requise !"],
        maxlength: [50, "La ville ne doit pas dépasser 50 caractères"]
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis !"],
        minlength: [6, "Le password doit avoir au moins 6 caractères"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: [],
    },
});

module.exports = mongoose.model('users', userSchema);