const express=require("express")
const order= require("../controller/order.controller")
const verifytoken = require("../middleware/Auth.middleware")
const routes=express.Router()
routes.get("/",order.findDH)
routes.get("/:id",order.findone)
routes.get("/DH/find/",verifytoken,order.findUserDH)
routes.get("/HD/findHD/",verifytoken,order.findUserHD)
routes.put("/:id",order.CheckDH)
routes.post("/",verifytoken,order.create)
module.exports=routes