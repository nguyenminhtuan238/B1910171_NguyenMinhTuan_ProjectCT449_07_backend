const express=require("express")
const cartdt = require("../controller/cartdt.controller")
const routes=express.Router()
routes.post("/",cartdt.create)
routes.get("/:id",cartdt.findorder)
module.exports=routes