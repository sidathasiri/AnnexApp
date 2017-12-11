var express = require('express');
var router = express.Router();
var path = require('path');

var Province = require('../models/province'); 
var User = require('../models/user'); 
var Post = require('../models/post');

router.get('/province', function(req, res, next){
    Province.find((err, result) =>{
        if(err)
            return err;
        return res.send(result);

    });
});

router.post('/addUser', function(req, res, next){
    User.findOne({'email': req.body.email}, function(err, user){
        if(err)
            return next(err);
        if(user){
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

router.post('/login', function(req, res, next){
    User.findOne({'email': req.body.email}, function(err, user){
        if(err)
            return next(err);
        if(!user){
            res.send({'error':'Wrong email or password!'});
        } else{
            if(!user.validPassword(req.body.password)){
                res.send({'error':'Wrong email or password!'});
            } else{
                res.send(user);
                console.log('you can login');
            }
        }
    });
});

router.get('/getUser/:email', function(req, res, next){
    User.findOne({'email': req.params.email}, function(err, user){
        if(err){
            next(err);
        }
        else{
            res.send(user);
        }
    });
});

router.post('/addPost', function(req, res, next){
    var post = new Post(req.body);
    post.save(function(err, result){
        if(err){
            next(err);
        } else{
            res.send(result);
        }
    });
});

router.get('/getPosts/:email', function(req, res, next){
    Post.find({'user': req.params.email}, function(err, result){
        if(err){
            next(err);
        } else{
            res.send(result);
        }
    });
});



module.exports = router;