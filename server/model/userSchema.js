const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    tokens:[
        {
        token:{
            type:String,
            required:true 
        }
       }
    ],
    queries:[
        {
            query:{type:Object}
        }
    ]
});

//here we generate token
userSchema.methods.generateToken = async function(){
    try{
      const newToken = jwt.sign({_id:this._id} , process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:newToken});
      await this.save();

      return newToken;

    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('user',userSchema);

module.exports = User;