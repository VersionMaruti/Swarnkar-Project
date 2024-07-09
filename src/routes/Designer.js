const express = require('express')
const router = express.Router()
const path = require('path')
const app = express()
// const session = require('express-session');
// const flash = require('connect-flash');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname,'public')));
// define the home page route
router.get('/', (req, res) => {
    const success_msg = req.flash('success_msg');
    res.render('Designer', { success_msg });
})
// define the about route
router.get('/:slug', (req, res) => {
    res.render('about', {foo: 'FOO'});
})

module.exports = router