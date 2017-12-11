var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    name: String,
    province: String,
    district: String,
    gender: String,
    price: Number,
    description: String,
    user: String,
    images: []
});

module.exports = mongoose.model('Post', postSchema, 'posts');