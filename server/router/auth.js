const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const Authenticate = require('../middleware/authenticate');



router.get('/',(req,res)=>{
    res.send('Hello Aniket , A future mern stack developer');
 });


router.post('/login', async(req,res) =>{

    const { email , name } = req.body;
    
    if(!email || !name){
       return res.status(422).send({"error":"Invalid Credentials"});
    }
    console.log(email,name);
      try{

        let userExist = await User.findOne({email:email});
        //res.send(userExist);
        if(!userExist){
           const user = new User({email,name});
           const tmp = await user.save(); // here we are saving user credential into database
           console.log("New user exist");
           userExist = user;
        }
         
        // here we generate token
            const token = await userExist.generateToken();
            //console.log("token = ",token);

            res.cookie("jwtToken",token,{
               expires: new Date(Date.now() + 25892000000),
               httpOnly:true,
               secure: false
            });

            return res.status(200).send({"Success":"Login Successful"});
        //}
        

    }catch(err){
      console.log(err);
      return res.status(422).send({"error":"Server Error"});
    }  

});
 
router.get('/search' ,Authenticate ,(req,res)=>{
      
    console.log("Reaches thke search");
    res.send(req.rootUser);
});


router.post('/addQuery' , Authenticate , (req,res)=>{

   //   console.log(req.body);
     const {title,adr,amount} = req.body;
     const newQuery = {title,adr,amount};
     console.log(newQuery);
     req.rootUser.queries = req.rootUser.queries.concat({query:newQuery});

     req.rootUser.save().then(()=>{
      return res.status(200).send({"Sucess":"Query added"});     
     }).catch(err=>{
         console.log(err);
          return res.status(422).send({"Error":"some errror occurred while adding query"});
     });    
});


module.exports = router;