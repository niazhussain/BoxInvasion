var express=require('express');
var router=express.Router();

//navigate register
router.get('/register',function(req,res){
    res.render('register');
});
//navigate login
router.get('/login',function(req,res){
    res.render('login');
});
module.exports=router;