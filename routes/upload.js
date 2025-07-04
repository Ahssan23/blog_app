const express = require("express")
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {Users, Blog} = require("../models/model")
const env = require("dotenv").config()


upload = express.Router()
upload.use(cookieparser())

upload.get("/upload", (req,res)=>{
    token = req.cookies['access_token'];
    if (token){
        try{

            const jwt_verify =jwt.verify(token,process.env.JWT_SECRET)
            if(jwt_verify)res.render("upload")
        }
        catch(error){
            console.log("JWT ERROR: ", error)
            res.redirect("/login")
        }
    }
    else{
        res.redirect("/login")
    }

})


upload.post("/upload_blog", async (req,res) => {
    token = req.cookies['access_token'];
    content =req.body.blog
    title =req.body.title
    if (token){
        try{

            const jwt_verify =jwt.verify(token,process.env.JWT_SECRET)
    
            if(jwt_verify){
                post_db = await Blog({name:jwt_verify["username"], content:content , title:title})
                post_db.save()
                res.redirect("/")
            }
        }
        catch(error){
            console.log("JWT ERROR: ", error)
            res.redirect("/login")
        }
    }
    
})

module.exports = upload;