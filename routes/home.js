const express = require("express")
const {Users, Blog} = require("../models/model")
const env = require("dotenv").config()
const cookieparser = require("cookie-parser")
const jwt = require('jsonwebtoken')


const home = express.Router()
home.use(cookieparser())

home.get("/", async(req,res)=>{
    try{
        token = req.cookies['access_token'];

        const jwt_verify =jwt.verify(token,process.env.JWT_SECRET)
        // console.log(jwt_verify['username'])

        // extracting the data 
        get_blog= await Blog.find()

        get_content = await get_blog.map((element)=>element.content)
        console.log(get_blog)

        // console.log(get_content)
        res.render("home",{"content": get_blog})

    }catch(err){
        res.redirect("/login")
        console.log(err)
    }



})

module.exports = home