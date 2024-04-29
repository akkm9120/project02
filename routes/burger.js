const express = require('express');

// create a new router object
const router = express.Router();
// a router object can contain routes

const {Burger} = require('../models')

router.get('/',async function(req,res){

    const burgers = await Burger.collection().fetch();
   
    res.render('./burgers/burgers',{
        burgers : burgers.toJSON()
    });
})

module.exports = router; 