const express = require("express");
const {User, Blog, Follow ,Comment} = require('../models/model')


const post = express.Router()

post.get("/full", async(req,res)=>{
    content = req.query.content
    title = req.query.title
    author = req.query.author
    id = req.query._id
    get_cmnt = await Comment.find()


    res.render("post", {"content": content, "title": title, "author": author, "id": id, "comments" :get_cmnt})

})


module.exports =post;