//Shafiq Aslam
var express=require('express');
var router=express.Router();

//navigate homepage
router.get('/',function(req,res){
    res.render('index');
});

module.exports = router;