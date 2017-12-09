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

    User.findOne({'email': req.body.email}, function(err, user){
        if(err)
            return next(err);
        if(user){
            console.log("User already exists!");
            res.send({'error':'User already exists!'});
        } else{
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function(err, user){
                if(err)
                    return next(err);
                res.json(user);
            });
        }
    });
});

module.exports = router;