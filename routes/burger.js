const express = require('express');

// create a new router object
const router = express.Router();
// a router object can contain routes

const {Burger} = require('../models');
const { bootstrapField, registerForm, createBurgerForm } = require('../forms');

router.get('/',async function(req,res){

    const burgers = await Burger.collection().fetch();
    res.render('./burgers/burgers',{
        burgers : burgers.toJSON()
    });
});

router.get('/add', async function (req, res) {


    const burgerForm = createBurgerForm();
    res.render('burgers/add', {
        form: burgerForm.toHTML(bootstrapField),
    })
});

router.post('/add', function(req,res){
    // create the product form object using caolan form
    const burgerForm = createBurgerForm();
    // using the form object to handle the request
    burgerForm.handle(req, {
        'success': async function(form) {
            // the forms has no error
            // to access each field in the submitted form
            // we use form.data.<fieldname>


            // create an instance of the Product model
            // an instance of a product is one row in the corresponding table
            const product = new Burger();
            product.set('item_name', form.data.item_name)
            product.set('cost', form.data.cost);
            product.set('description', form.data.description);
            product.set('availability', form.data.availability);
            product.set('image_url',form.data.img_url);
            // save the product to the database
            await product.save();

            // same as:
            // INSERT INTO products (name, cost, description)
            // VALUES (${form.data.name}, ${form.data.cost}, ${form.data.description})
            res.redirect("/burger");
        },
        'empty': function(form) {
            // the user submitted an empty form
            res.render('burgers/add', {
                form: burgerForm.toHTML(bootstrapField)
            })
        },
        'error': function(form) {
            // the user submitted a form with error
            res.render('burgers/add', {
                form: form.toHTML(bootstrapField)
            })
        }
    })
});




module.exports = router; 