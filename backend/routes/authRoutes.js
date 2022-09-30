const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const auth = require("../middleware/auth")
//validate if correct data has been sent 
//joi allows makes validating javascript objects easy 
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({}); //need this variable in order for joi to work properly in express server 

//validation schema, before it goes to the server
const registerSchema = Joi.object({
username: 
Joi.string() //username is a string 
.min(3) // minimum of 3 chracters 
.max(12) //maximum of 12 chracters
.required(),  // is required
 
password: 
Joi.string()
.min(6)
.max(12)
.required(),

mail: 
Joi.string()
.email()
.required(),
});

const loginSchema = Joi.object({
    password: 
    Joi.string()
    .min(6)
    .max(12)
    .required(),

    mail: 
    Joi.string()
    .email()
    .required(),
})

//authentication routes 

router.post("/register", validator.body(registerSchema), authControllers.controllers.postRegister);

router.post("/login", validator.body(loginSchema), authControllers.controllers.postLogin); 
// first user route to login in, then validator, if not validated in cannot go to post login 


//test route to verify if middleware is working 
router.get('/test', auth, (req, res)=>{
    res.send('request passed')
});



module.exports = router;