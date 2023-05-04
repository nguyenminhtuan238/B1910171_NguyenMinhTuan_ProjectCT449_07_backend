const Auth = require("../models/auth")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const salt = 10
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/src/public/user')
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname)


    }
})
const upload = multer({
    storage: storage
}).single('Img')
exports.uploaduser = upload
exports.finduser= async (req,res)=>{
        try {
                const finduser=await Auth.findOne({_id:req.user.iduser})
                res.json({success:true,finduser})
        } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, mess: "Loi Server" })
        }
}
exports.Register = async (req, res) => {
        try {
                const { username, password,Name,Phone,Address } = req.body
                if (!username || !password) {
                        return res.status(405).json({ success: false, mess: "Khong duoc de trong" })
                }
                const finduser = await Auth.findOne({ UserName: username })
                if (!finduser) {
                        const hash = bcrypt.hashSync(password, salt)
                        const newuser = new Auth({
                                UserName: username,
                                Password: hash,
                                Name:Name,
                                Address:Address,
                                Phone:Phone,
                                role:false,
                                createAt: Date.now()
                        })
                        await newuser.save()
                        const acctoken = jwt.sign({ iduser: newuser._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
                        res.json({ success: true, acctoken })
                } else {
                        return res.status(403).json({ success: false, mess: "username da ton tai" })
                }

        } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, mess: "Loi Server" })
        }
}
exports.Login = async (req, res) => {
        try {
                const { username, password } = req.body
                if (!username || !password) {
                        return res.status(405).json({ success: false, mess: "Khong duoc de trong" })
                }
                const finduser = await Auth.findOne({ UserName: username })
                if (finduser) {
                        const compare = await bcrypt.compare(password, finduser.Password)
                        if (compare) {
                                const acctoken = jwt.sign({ iduser: finduser._id }, 
                                        process.env.SECRET_KEY, 
                                        { expiresIn: '1d' })
                                return res.json({ success: true, acctoken })
                        }else{
                                return res.status(403).json({ success: false, mess: "username va password sai" })    
                        }

                } else {
                        return res.status(403).json({ success: false, mess: "username va password sai" })
                }

        } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, mess: "Loi Server" })
        }
}
exports.IFM = async (req, res) => {
        try {
                const { Name, Address,Phone } = req.body
                if(req.file==undefined){
                        await Auth.updateOne({_id:req.user.iduser},
                                { Name:Name,
                                Address:Address,
                                Phone:Phone,
                                })
                        const finduser = await Auth.findOne({_id:req.user.iduser })
                        return res.json({ success: true, finduser })
                }else{
                        
                if(req.file.mimetype ==='image/jpeg' || req.file.mimetype ==='image/png'){
                        await Auth.updateOne({_id:req.user.iduser},
                                { Name:Name,
                                Address:Address,
                                Phone:Phone,
                                image:req.file.filename
                                })
                        const finduser = await Auth.findOne({_id:req.user.iduser })
                        return res.json({ success: true, finduser })
                }else{
                        return res.status(405).json({ success: false, message: "Lỗi File" })
                }
                }
              
        } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, mess: "Loi Server" })
        }
}