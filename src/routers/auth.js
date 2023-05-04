const express=require("express")
const routes=express.Router()
const auth=require("../controller/auth.controller")
const verifytoken = require("../middleware/Auth.middleware")
routes.get("/",verifytoken,auth.finduser)
routes.post("/Register",auth.Register)
routes.post("/login",auth.Login)
routes.put("/",verifytoken,auth.uploaduser,auth.IFM)
module.exports=routes