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
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
});


router.post('/add-product', async function (req, res) {

    // get all the categories
    const allCategories = await Category.fetchAll().map(category => [category.get('id'), category.get('name')]);

    // get all the tags 
    const allTags = await Tag.fetchAll().map(t => [t.get('id'), t.get('name')]);

    // create the product form object using caolan form
    const productForm = createProductForm(allCategories, allTags);
    // using the form object to handle the request
    productForm.handle(req, {
        'success': async function (form) {
          const product = await dataLayer.createProduct(form.data);

            // a flash message can only be set before a redirect
            // req.flash has two arugments: 
            // 1st: the type of message to show (it's up to the developer to define)
            // 2nd: what message to show
            // req.flash will add a new flash message to the current session
            req.flash('success_messages', 'New product has been created successfully');
            res.redirect("/products/");
        },
        'empty': function (form) {
            res.render('products/create', {
                form: productForm.toHTML(bootstrapField)
            })
        },
        'error': function (form) {
            // the user submitted a form with error
            res.render('burgers/add', {
                form: form.toHTML(bootstrapField)
            })
        }
    })
});




module.exports = router; 