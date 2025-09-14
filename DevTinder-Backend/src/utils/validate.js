const validator=require("validator");
const validation=(req)=>
{
    const{firstName,lastName,EmailId,Password}=req.body;
    if(firstName.length==0 || lastName.length==0)
    {
        throw new Error("Invalid Name");
    }
    else if(!validator.isEmail(EmailId))
    {
       throw new Error("Invalid Email")
    }
    else if(!validator.isStrongPassword(Password))
    {
       throw new Error("Enter a strong Password");
    }
}
module.exports=validation;