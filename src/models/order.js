const mongoose=require("mongoose")
const schema=mongoose.Schema
const order= new schema({
    ID_User:{
        type:schema.Types.ObjectId,
        ref:"Auths"
    },
    Total:{
        type:Number
    },
    Name:{
        type:String
    },
    Address:{
        type:String
    },
    Phone:{
        type:Number
    },
    status:{
        type:Boolean
    },
    createAt:{
        type:Date
    }
})
module.exports=mongoose.model("orders",order)