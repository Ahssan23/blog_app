const express = require("express")
const jwt = require('jsonwebtoken')
const cookieparser = require("cookie-parser")
const env = require('dotenv').config()
const {User, Blog, Follow ,Comment} = require('../models/model')

comment = express.Router()


comment.post("/comment",async (req,res)=>{
    comment = req.body.comment
    id =req.body.id
    comment = req.body.comment
    token = req.cookies["access_token"]

    decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded['username'])

    post_db= await Comment({user:decoded['username'], CmntID:id, comment:comment})
    post_db.save()
    res.redirect(req.get('referer'));


})


module.exports = comment;