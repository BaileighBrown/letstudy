//we are checkin if the token is valid ,, its for protection 

const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    //getting token from request 
let token = req.body.token || req.query.token || req.headers['authorization'];

//if theres no token 
if(!token){
    return res.status(403).send("A token is required for authentication");
}
try {
token = token.replace(/^Bearer\s+/, "");
const decoded = jwt.verify(token, config.TOKEN_KEY);
req.user = decoded; 

} catch (err){

    return res.status(401).send('Invalid Token');
}

return next(); //goes to nect step
};

module.exports = verifyToken;