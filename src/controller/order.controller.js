const order = require("../models/order");
exports.create=async (req,res)=>{
    try {
        const {total,Name,Address,Phone}=req.body
        const createorder=new order({
            ID_User:req.user.iduser,
            Total:total,
            Name:Name,
            Address:Address,
            Phone:Phone,
            status:false,
            createAt:Date.now()
        })
        await createorder.save()
        res.json({mess:"Them thanh cong",createorder})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}
exports.findDH=async (req,res)=>{
    try {
        const Order=await order.find({status:false})
        res.json({mess:"Them thanh cong",Order})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}
exports.findUserDH=async (req,res)=>{
    try {
        const Order=await order.find({ID_User:req.user.iduser,status:false})
        res.json({mess:"Them thanh cong",Order})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}
exports.findUserHD=async (req,res)=>{
    try {
        const Order=await order.find({ID_User:req.user.iduser,status:true})
        res.json({mess:"Them thanh cong",Order})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}
exports.CheckDH=async (req,res)=>{
    try {
        await order.updateOne({ _id: req.params.id },{status:true})
        const Order=await order.find({status:false})
        res.json({mess:"Them thanh cong",Order})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}
exports.findone=async (req,res)=>{
    try {
        const Order=await order.find({ _id:req.params.id })
        res.json({mess:"Them thanh cong",Order})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}