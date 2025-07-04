const express = require("express")
const {Users, Blog, Follow} = require("../models/model")
const jwt = require("jsonwebtoken")




profile = express.Router()



profile.get("/profile",async (req,res)=>{
    try{ 

        token = req.cookies["access_token"]
        decoded = jwt.verify(token,process.env.JWT_SECRET )
        
        get_followers= await Follow.find({name:decoded['username']})
        following = get_followers.map((element)=>element.following)
        console.log(following.length)
        
        res.render("profile", {"following":following})
    }catch(err){
        res.redirect("/login")
    }
})


profile.get("/seefollowing",async(req,res)=>{
    token = req.cookies["access_token"]
    decoded = jwt.verify(token,process.env.JWT_SECRET )
        
    get_followers= await Follow.find({name:decoded['username']})
    following = get_followers.map((element)=>element.following)
    console.log(following)
    res.render("following", {"following":following})

})





module.exports = profile