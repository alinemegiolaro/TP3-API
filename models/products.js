const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(  {
    title: {
        type: String,
        required: [true, "Le titre est requis !"],
        maxlength: [50, "Le titre ne doit pas dépasser 50 caractères"]
      },
      description: {
        type: String,
        required: [true, "Le description est requise"],
        maxlength: [255, "La description ne doit pas dépasser 255 caractères"]
      },
      price: {
        type: Number,
        required: [true, "Le prix est requis"]
      },
      imageURL: {
        type: [],
        required: [true, "Les images sont requis"],
        validate: {
            validator: function (array) {
              return array.every(image => image.length <= 255);
            },
            message: "Chaque URL d'image ne doit pas dépasser 255 caractères"
        }
      },
      categoryId: {
        type: String,
        required: [true, "La catégorie est requise"]
      },
      userId: {
        type: String,
        required: [true, "L'utilisateur est requis"]
      },
      isSold: {
        type: Boolean,  
        default: false
      },
      updatedAt: {  
        type: Date,
        default: Date.now
      },
      createdAt: {  
        type: Date, 
        default: Date.now 
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', productSchema);