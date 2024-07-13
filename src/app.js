require("dotenv").config()

const express = require('express')
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const path = require('path')  


const Designer = require('./routes/Designer'); // Ensure this file exports an Express router
require("./db/conn"); 

const Register = require('./Models/jewellery')
const app = express()
const port = process.env.PORT || 3000
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));





//Middleware setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized:true
}));
app.use(flash());

app.use((req,res,next)=>{ 
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/Designer', Designer);

app.get('/', (req, res) => {
    res.render('Home', { foo: 'FOO' });
})
app.get('/wishlist', (req, res) => {
    res.render('wishlist', { foo: 'FOO' });
})
app.get('/stores', (req, res) => {
    res.render('stores', { foo: 'FOO' });
})
app.get('/Signin', (req, res) => {
    res.render('SignIn', { foo: 'FOO' });
})
app.get('/Signup', (req, res) => {
    res.render('SignUp', { foo: 'FOO' });
})
app.post('/Signup', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if (password == cpassword) {
            const Users = new Register({
                fullname: req.body.fullName,
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                gender: req.body.gender
            })

            const registered = await Users.save();
            const Gender = req.body.gender;
            req.flash('success_msg', 'Registration successful!');
            if(Gender == "Seller"){
                res.redirect('/stores'); 
            }else if(Gender == "Customer"){
                res.redirect('/wishlist');
            }else{
                res.redirect('/Designer');
            }
        }else{
            req.flash('error_msg', 'Passwords do not match.');
            res.redirect('/Signup')
        }
    } catch (error) {
        req.flash('error_msg', 'Invalid data entered or registration failed.');
        res.redirect('/signup'); // Redirect back to signup page on error
    }
})
app.post('/Signin',async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const username = await Register.findOne({username:name});

        if(username.email === email && username.password === password){
            req.flash('success_msg', 'Login successful!');
            res.redirect('/'); 
        }else{
            req.flash('error_msg', 'User not found!');
             res.redirect('/Signin'); //Adjust the route as needed
        }

    } catch (error) {
        req.flash('error_msg','An error occurred!');
         res.redirect('/Signin'); //Adjust the route as needed
    }
});
app.get('/cart', (req, res) => {
    res.render('cart', { foo: 'FOO' });
})
 
app.listen(3000, () => console.log('Example app listening on port 3000!'));