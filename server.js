var express = require('express');
const cors = require('cors');
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var main = require('./server/routes/main');
var api = require('./server/routes/api'); 
const PORT = 3000;
var DB = "mongodb://localhost/AnnexApp";

var Post = require('./server/models/post');

var upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads/')
      },
      filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
      }
    })
  });

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);
app.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

mongoose.connect(DB, function(error){
    if(error)
        return error
    console.log("connected to "+DB);
});

app.post('/uploadPost', upload.any(), (req, res) => {
    console.log('in uploading');
    res.json(req.files.map(file => {
      let ext = path.extname(file.originalname);
      console.log(req.files[0].path);
      console.log(req.body);

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

app.listen(PORT, function(err){
    if(err)
        return err
    console.log("server started on port "+PORT);
});

