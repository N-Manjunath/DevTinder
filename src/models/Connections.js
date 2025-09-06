const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const { applyTimestamps } = require("./user");
const User = require("./user");
const ConnectionSchema=new Schema({
fromID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
},
toID:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
},
status:{
    type:String,
    enum:["Interested","Ignored","Accepted","Rejected"],
}

});
ConnectionSchema.pre("save",function(next){
    const connectRequest=this;
    if(connectRequest.fromID.equals(connectRequest.toID))
    {
        throw new Error("the self connection is not allowed !");
    }
    next();
});
const Connections=new mongoose.model("Connections",ConnectionSchema);
module.exports=Connections;