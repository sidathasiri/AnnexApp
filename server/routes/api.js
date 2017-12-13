var express = require('express');
var multer = require('multer');
var router = express.Router();
var path = require('path');

var Province = require('../models/province'); 
var User = require('../models/user'); 
var Post = require('../models/post');

var upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/uploads');
      },
      filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
      }
    })
  });


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

router.get('/getPosts/:email', function(req, res, next){
    Post.find({'user': req.params.email}, function(err, result){
        if(err){
            next(err);
        } else{
            res.send(result);
        }
    });
});

router.post('/uploadPost', upload.any(), (req, res, next) => {
    console.log('in uploading');
    res.json(req.files.map(file => {
      let ext = path.extname(file.originalname);
      req.body.images = req.files[0].destination.substring(8) + '/' + req.files[0].filename;
      var post = new Post(req.body);
      post.save(function(err, result){
          if(err){
              next(err);
          } else{
              console.log(result);
          }
      });

      return {
        originalName: file.originalname,
        filename: file.filename
      }
    }));
  });

router.delete('/deletePost/:id', function(req, res, next){
    console.log(req.params.id);
    Post.remove({'_id': req.params.id}, (err, result) => {
        if(err){
            next(err);
        }
        else{
            res.send(result);
        }
    });
});

router.put('/updatePost', function(req, res, next){
    console.log("updatinggggg");
    var newPost = req.body;
    console.log(newPost);
    Post.findByIdAndUpdate(newPost._id, { $set: newPost}, (err, result) => {
        if(err){
            console.log(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});


module.exports = router;