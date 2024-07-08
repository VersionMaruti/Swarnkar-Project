const express = require('express')
const router = express.Router()
const app = express()
const path = require('path')

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
// define the home page route
router.get('/', (req, res) => {//Yahan par blog karne ki jaroorat nhi hain kyunki humne already blog kar diya hain to 3000/blog karne par hi chalega ye.
    res.render('Designer', {foo: 'FOO'});
})
// define the about route
router.get('/:slug', (req, res) => {
    res.render('about', {foo: 'FOO'});
})

module.exports = router