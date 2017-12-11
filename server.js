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

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

mongoose.connect(DB, function(error){
    if(error)
        return error
    console.log("connected to "+DB);
});

app.listen(PORT, function(err){
    if(err)
        return err
    console.log("server started on port "+PORT);
});

