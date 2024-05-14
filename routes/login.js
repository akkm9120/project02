const express = require('express');
const router = express.Router();




router.get('/',async function(req,res){  
    res.render('./login/loginPage',{
    
    });
});
router.get('/register',async function(req,res){  
    res.render('./login/registerPage',{
    
    });
})

module.exports = router; 