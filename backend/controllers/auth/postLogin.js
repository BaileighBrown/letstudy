const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postLogin = async (req, res) => {
   try {
const { mail, password } = req.body;

const user = await User.findOne({ mail: mail.toLowerCase() }); 

//if the user is found 
if(user && (await bcrypt.compare(password, user.password) )){
    // send new token 
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

    return res.status(200).json({ 
        userDetails: { 
            mail:user.mail, 
            token:token,
            username:user.username,
            _id: user._id,
        },
    });
}

//if user is not found
return res.status(400).send('invalid credentials. try again ')

   } catch (err) {
    return res.status(500).send('Something went wrong. Please try again');
   }
};

//at this point register and login routes are working on postman 

module.exports = postLogin;
