const express = require('express')
const Designer = require('./routes/Designer'); // Ensure this file exports an Express router
require("./db/conn");
const Register = require('./Models/jewellery')
const mongoose = require("mongoose");
const app = express()
const port = process.env.PORT || 3000
const path = require('path')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
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
            if(Gender == "Seller"){
                res.status(201).render("stores")
            }else if(Gender == "Customer"){
                res.status(201).render("Wishlist")
            }else{
                res.status(201).render("Designer")
            }
        }else{
            res.send("Password are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post('/Signin',async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const username = await Register.findOne({username:name});

        if(username.email === email && username.password === password){
            res.status(201).render("Home")
        }else{
            res.send("User not found!")
        }

    } catch (error) {
        res.status(400).render(error);
    }
})
app.get('/cart', (req, res) => {
    res.render('cart', { foo: 'FOO' });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));