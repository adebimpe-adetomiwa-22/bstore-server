const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    rating: Number,
    image: String,
    description: String,
    upc: String,
    product_type: String,
    price_excl_tax: Number,
    price_incl_tax: Number,
    tax: Number,
    availability: Number,
    reviews: Number,
    currency: String,
});

const bookModel = mongoose.model('Book', bookSchema);
module.exports = bookModel;
