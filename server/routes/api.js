var express = require('express');
var router = express.Router();
var path = require('path');

var Province = require('../models/province'); 
var User = require('../models/user'); 

router.get('/province', function(req, res, next){
    Province.find((err, result) =>{
        if(err)
            return err;
        return res.send(result);

    });
});

router.post('/addUser', function(req, res, next){
    console.log('in add user');
    console.log(req.body);
    User.create(req.body, function(err, post){
        if(err)
            return next(err);
        res.json(post);
    });
});

module.exports = router;