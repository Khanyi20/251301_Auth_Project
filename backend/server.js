const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("./models/User");
console.log(User);

console.log(typeof User);



const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));

// Registration 

app.post("/register", async (req, res) => {

    try {

        const {
            email,
            password,
            chessPattern
        } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        const newUser = new User({
            email,
            password: hashedPassword,
            chessPattern
        });

        await newUser.save();

        res.json({
            message: "Registration successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});


// Login

app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password,
            chessPattern
        } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Verify chess pattern

        if (!Array.isArray(chessPattern)) {
            return res.status(400).json({
                message: "Chess pattern is required"
            });
        }

        const patternsMatch =
            chessPattern.length === user.chessPattern.length &&
            chessPattern.every((piece, index) => piece === user.chessPattern[index]);

        if (!patternsMatch) {
            return res.status(400).json({
                message: "Chess pattern incorrect"
            });
        }

        res.json({
            message: "Login successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

