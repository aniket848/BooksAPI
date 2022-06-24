const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');


const Authenticate = async (req,res,next)=>{
    
    try{

        const token = req.cookies.jwtToken;

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id: verifyToken._id , "tokens.token":token});
        console.log(rootUser);
        req.rootUser = rootUser;
        next();

    }catch(err){
        res.status(400).send("Unauthorized: Token not provided");
        console.log(err);
    }
}

module.exports = Authenticate;