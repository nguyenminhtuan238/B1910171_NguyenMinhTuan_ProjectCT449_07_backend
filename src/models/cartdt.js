const mongoose=require("mongoose")
const schema=mongoose.Schema
const cartdt= new schema({
    ID_pd:{
        type:schema.Types.ObjectId,
        ref:"products"
    },
    ID_ord:{
        type:schema.Types.ObjectId,
        ref:"orders"
    },
    quancity:{
        type:Number
    },
    createAt:{
        type:Date
    }
})
module.exports=mongoose.model("cartdts",cartdt)