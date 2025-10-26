const mongoose=require("mongoose");
const validator=require("validator");
const {Schema} =mongoose;
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userSchema=new Schema({
    firstName:
    { type:String,
        required:true,
    },
    lastName:{ type:String,
        required:true,
    },
    EmailId:{ type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("the Email is not valid !")
            }
        }
    },
    Password:{
        type:String,
        required:true,
    },
    Age:{ type:Number,
    },
    Gender:{
        type:String,
        enum:['male','female','other']

    },
    Bio:
    {
        type:String,
        default:'This is the user',
    },
    Skills:{
        type:[String],
    },
    PhotoUrl:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/046/010/545/non_2x/user-icon-simple-design-free-vector.jpg',
    },
}
,{timestamps:true});


userSchema.methods.isjwt=async function(){
const user=this;
   const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,  { expiresIn: "8h" } );
   return token;
}
userSchema.methods.validatePassword=async function(Inputpassword){
    const user=this;
    const validpswrd=await bcrypt.compare(Inputpassword,user.Password);
    return validpswrd;
}

const User=mongoose.model('User',userSchema);
module.exports=User;