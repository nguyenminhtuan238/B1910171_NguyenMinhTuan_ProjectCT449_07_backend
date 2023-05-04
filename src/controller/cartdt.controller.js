const cartdt = require("../models/cartdt");
exports.create=async (req,res)=>{
    const {id_pd,id_or,quancity}=req.body
    try {
        const createcartdt=new cartdt({
            ID_pd:id_pd,
            ID_ord:id_or,
            quancity:quancity,
            createAt:Date.now()
        })
        await createcartdt.save()
        res.json({mess:"Them thanh cong",createcartdt})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}
exports.findorder=async (req,res)=>{
    try {
       const Cartdt=await cartdt.find({ID_ord:req.params.id})
        res.json({mess:"Them thanh cong",Cartdt})
    } catch (error) {
        console.log(error)
        res.status(500).json({mess:"Loi server"})
    }
}