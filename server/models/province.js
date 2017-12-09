var mongoose = require('mongoose');

var provinceSchema = mongoose.Schema({
    _id: Number,
    name: String,
    districts: []
});

module.exports = mongoose.model('Province', provinceSchema, 'provinces');