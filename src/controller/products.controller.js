const products = require("../models/products");
const multer = require('multer')
const pageSize=6
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/src/public/img')
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname)


    }
})
const upload = multer({
    storage: storage
}).single('img')

exports.uploadImg = upload
exports.create = async (req, res) => {
    const { title,Kho,Price } = req.body
        if(req.file===undefined){
            return res.status(402).json({ success: false, message: "File Rỗng" })
        }
        try {
            const errtitle = await products.findOne({ tilte: title })
            if(req.file.mimetype ==='image/jpeg' || req.file.mimetype ==='image/png'){
                if (errtitle) {
                    return  res.status(401).json({ success: false, message: "Tên video đã tồn tại" })
                } else {
                    const newproducts = new products({
                        tilte: title,
                        Img: req.file.filename,
                        Kho:Kho,
                        Price:Price,
                        createAt: Date.now()
                    })
                    await newproducts.save()
                    const findproducts = await products.find()
                    return  res.json({ message: "Them thanh cong", findproducts })
                }
            }else{
                return res.status(405).json({ success: false, message: "Lỗi File" })
            }
           
    
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Lỗi server" })
        }
    
    
}
exports.findone = async (req, res) => {
    try {
        const findproducts = await products.findOne({ _id: req.params.id })
        res.json({ message: "success", findproducts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Lỗi server" })
    }
}
exports.findALL = async (req, res) => {
    try {
        let page=req.query.page
        if(page){
            page=parseInt(page)
            const skippage=(page-1)*pageSize
            const findproducts = await products.find().skip(skippage).limit(pageSize)
            res.json({ message: "success", findproducts })
        }else{
            const findproducts = await products.find()
            res.json({ message: "success", findproducts })
        }
      
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Lỗi server" })
    }
}
exports.deteleone = async (req, res) => {
    try {
        await products.deleteOne({ _id: req.params.id })
        const findproducts = await products.find()
        res.json({ message: "success", findproducts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Lỗi server" })
    }
}
exports.updateone = async (req, res) => {
    const { title,Kho,Price } = req.body
    try {
            if (req.file === undefined) {
                const newproducts = {
                    tilte: title,
                    Kho:Kho,
                    Price:Price,
                    createAt: Date.now()
                }
                await products.updateOne({ _id: req.params.id }, newproducts)
                const findproducts = await products.find()
                res.json({ message: "success", findproducts })
            } else {
                if(req.file.mimetype ==='image/jpeg' || req.file.mimetype ==='image/png'){
                    const newproducts = {
                        tilte: title,
                        Img: req.file.filename,
                        Kho:Kho,
                        Price:Price,
                        createAt: Date.now()
                    }
                    await products.updateOne({ _id: req.params.id }, newproducts)
                    const findproducts = await products.find()
                    res.json({ message: "success", findproducts })
                }else{
                    return res.status(405).json({ success: false, message: "Lỗi File" })
                }
                
            }

        
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Lỗi server" })
    }
}
exports.search=async (req,res)=>{
    try {
      
        const findproducts=await products.find({tilte: new RegExp(req.params.pd,'i')})
        res.json({success:true,findproducts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.updateKho=async (req,res)=>{
    const {Kho} = req.body
    try {
        await products.updateOne({ _id: req.params.id }, {Kho:Kho})
        const findproducts = await products.findOne({ _id: req.params.id })
        res.json({ message: "success", findproducts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}