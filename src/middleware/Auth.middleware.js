const jwt = require("jsonwebtoken")
const verifytoken = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ success: false, message: "Access token not found" })
    }
    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decode
        next()
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, mess: "Loi Server" })
    }
}
module.exports=verifytoken