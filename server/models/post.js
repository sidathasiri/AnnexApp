var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    name: String,
    province: String,
    district: String,
    gender: String,
    price: Number,
    description: String,
    img1: String,
    img2: String,
    img3: String,
    user: String
});

module.exports = mongoose.model('Post', postSchema, 'posts');