const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const { applyTimestamps } = require("./user");
const ConnectionSchema=new Schema({
fromID:{
    type:mongoose.Schema.Types.ObjectId,
},
toID:
{
    type:mongoose.Schema.Types.ObjectId,
},
status:{
    type:String,
    enum:["Interested","Ignored"]
}

});

const Connections=new mongoose.model("Connections",ConnectionSchema);
module.exports=Connections;