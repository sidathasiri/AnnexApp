var mongoose = require('mongoose');

var provinceSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Province', provinceSchema, 'provinces');