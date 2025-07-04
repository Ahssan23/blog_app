const express = require('express');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Users, Blog, Follow } = require("../models/model");

const followingRouter = express.Router();

followingRouter.post("/follow", async (req, res) => {
    const personToFollow = req.body.name;
    const token = req.cookies['access_token'];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (personToFollow === decoded.username) {
            console.log("Can't follow yourself!");
            return res.redirect("/");
        }

        const ifFollowed = await Follow.findOne({
            name: decoded.username,
            following: personToFollow
        });

        if (!ifFollowed) {
            const newFollow = new Follow({
                name: decoded.username,
                following: personToFollow
            });

            await newFollow.save();
            console.log(`Now following: ${personToFollow}`);
            return res.redirect("/");
        } else {
            console.log("Already following this person");
            return res.redirect("/");
        }

    } catch (err) {
        console.log(err);
        return res.redirect("/login");
    }
});

module.exports = followingRouter;
