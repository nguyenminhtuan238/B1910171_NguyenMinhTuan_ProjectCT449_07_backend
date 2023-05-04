const mongoose=require("mongoose")
const schema=mongoose.Schema
const Auth= new schema({
    UserName:{
        type:String,
        require:true
    },
    Password:{
        type:String
    },
    role:{
        type:Boolean
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
    image:{
        type:String
    },
    createAt:{
        type:Date
    }
})
module.exports=mongoose.model("Auths",Auth)