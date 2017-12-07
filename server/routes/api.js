var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/test', function(req, res, next){
    res.send({name: 'test data'});
});

module.exports = router;