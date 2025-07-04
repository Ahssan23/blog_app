const mongoose= require("mongoose")


const UserSchema = mongoose.Schema({
    name:String,
    pass:String
})

const BlogSchema = mongoose.Schema({
    name: String,
    content:String,
    title :String
})

const FollowSchema = mongoose.Schema({
    name:String,
    following:String
})


const CommentSchema =mongoose.Schema({
    user:String,
    CmntID:String,
    comment:String
})

const User = mongoose.model("User", UserSchema, "users")
const Follow = mongoose.model("Follow", FollowSchema, "following")
const Blog = mongoose.model("Blog", BlogSchema, "blog_content")
const Comment = mongoose.model("Comments", CommentSchema, "comments")


module.exports = {User, Blog, Follow ,Comment}