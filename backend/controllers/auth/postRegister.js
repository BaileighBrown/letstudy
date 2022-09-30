
const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
   try {
    
// logic to register a new account 
const{ username, mail, password } = req.body;  //get this information from request body 

//check if user exists
const userExists = await User.exists({  mail: mail.toLowerCase() });

if (userExists){
    return res.status(409).send('email already in use')
}

//encrypt users password , hashing password 
const encryptedPassword = await bcrypt.hash(password, 10);

//create user document and save in database 
const user = await User.create({ 
    username, 
    mail: mail.toLowerCase(),
    password: encryptedPassword

});

//create JWT token
const token = jwt.sign(
    {
        userId: user._id,   //getting the _id from the mongo databse bc ever new document has one 
        mail
    },

    //secret 
    process.env.TOKEN_KEY,
    {
        expiresIn: '24h'
    }
);

//once user is created send this recognition to user, json formatting 
res.status(201).json({ 
    userDetails: { 
    mail: user.mail, 
    token: token, 
    username: user.username,

    }
})
//catches any error that may occur when creating user
   } catch(err) {
    return res.status(500).send('Error Occured. Please try again');
   }
};

module.exports = postRegister;
