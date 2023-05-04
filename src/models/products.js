const mongoose=require("mongoose")
const schema=mongoose.Schema
const products= new schema({
    tilte:{
        type:String,
        require:true
    },
    Img:{
        type:String
    },
    Kho:{
        type:Number
    },
    Price:{
        type:Number
    },
    createAt:{
        type:Date
    }
})
module.exports=mongoose.model("products",products)