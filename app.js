const express = require("express")
const cookie = require("cookie-parser")

const home = require("./routes/home")
const auth = require("./routes/auth")
const upload = require("./routes/upload")
const profile = require("./routes/profile")
const post = require("./routes/post")
const comment = require("./routes/comment")
const followingRouter = require("./routes/following")



const app = express();
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))  

app.use("/", home)
app.use("/", auth)
app.use("/", upload)
app.use("/",profile)
app.use("/",followingRouter)
app.use("/",post)
app.use("/",comment)

app.listen(4000, ()=>console.log("listening on server"))
