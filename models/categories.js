const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Le nom est requis !"],
        maxlength: [50, "Le nom ne doit pas dépasser 50 caractères"]
    },
    updatedAt: {  
      type: Date,
      default: Date.now
    },
    createdAt: {  
      type: Date, 
      default: Date.now 
    },
});

module.exports = mongoose.model('categories', categorySchema);