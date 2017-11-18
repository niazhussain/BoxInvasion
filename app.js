var express= require('express');
var path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var passport=require('passport');
var localStrategy= require('passport-local').Strategy;
var  flash=require('connect-flash');
var session= require('express-session');
var mongo=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db=mongoose.connection;

var routes=require('./routes/index');
var users=require('./routes/users');

//initiallize the app
var app=express();

// setting up view engine to tell the system
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

//BodyParsing Middleware before handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));//https://stackoverflow.com/questions/29175465/body-parser-extended-option-qs-vs-querystring
app.use(cookieParser());

//seting up the statis folder for public access
app.use(express.static(path.join(__dirname,'public')));

//setting for session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

//init passport

app.use(passport.initialize());
app.use(passport.session());
//Express validator

app.use(expressValidator({
   errorFormatter:function (param,msg,value) {
       var namespace=param.split('.'),
           root=namespace.shift(),
           formParam=root;
       while (namespace.length){
           formParam+='['+namespace.shift()+']';
       }
       return{
           param:formParam,
           msg:msg,
           value:value
       };

   }
}));

//connecting to flash
app.use(flash());

//global variables
app.use(function (req,res,next) {
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/',routes);
app.use('/users',users);

//set port for my application

app.set('port',(3000));
app.listen(app.get('port'),function () {
    console.log('My server is started on the prot '+ app.get('port'));
});