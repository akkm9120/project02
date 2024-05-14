// setup express
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();

const app = express();

// use hbs for the view engine
app.set('view engine', 'hbs');

// enable the static folder
app.use(express.static('public'));

// enable wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(
    express.urlencoded({
        'extended': false
    })
);

async function main() {
    // routes will be inside here
    const landingRoutes = require('./routes/landing');
    const burgerRoutes = require('./routes/burger')
    const loginRoutes = require('./routes/login')

    // use the landing routes
    app.use('/', landingRoutes);
    app.use('/burger', burgerRoutes)
    app.use('/user',loginRoutes)


  
}

main();

app.listen(3000, ()=>{
    console.log("server has started");
})