var express = require('express');
var router = express.Router();
var path = require('path');

var Province = require('../models/province'); 

router.get('/province', function(req, res, next){
    Province.find((err, result) =>{
        if(err)
            return err;
        return res.send(result);

    });
});

module.exports = router;