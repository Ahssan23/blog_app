const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, Blog } = require("../models/model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/BLOG")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const auth = express.Router();

// SIGNUP ROUTES
auth.get("/signup", async (req, res) => {
    res.render('signup', { exists_username: false });
});

auth.post("/signup", async (req, res) => {
    const username = req.body.name;
    const password = req.body.pass;

    const find_username = await User.findOne({ name: username });

    if (find_username) {
        return res.render("signup", { exists_username: true });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.log(err);
            return res.redirect("/signup");
        }

        if (hash) {
            const newUser = new User({ name: username, pass: hash });
            await newUser.save();
            console.log("User created:", username);
            res.redirect("/login");
        }
    });
});

// LOGIN ROUTES
auth.get("/login", (req, res) => {
    res.render("login");
});

auth.post("/login", async (req, res) => {
    try {
        const username = req.body.user;
        const pass = req.body.pass;

        const find_user = await User.findOne({ name: username });

        if (find_user) {
            bcrypt.compare(pass, find_user.pass, (err, match) => {
                if (err) {
                    console.log("Error comparing passwords:", err);
                    return res.redirect("/login");
                }

                if (match) {
                    console.log("Password matched");

                    const payload = { username: username };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                    res.cookie("access_token", token);
                    return res.redirect("/");
                } else {
                    console.log("Password does not match");
                    return res.redirect("/login");
                }
            });
        } else {
            console.log("User not found");
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        res.redirect("/login");
    }
});

module.exports = auth;
