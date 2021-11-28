//#region namespaces
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
// const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "AnShBaLaJiThAkUrIsAgOoDbOOY123123";

//#endregion

//#region Route 1: Creating a User using POST "api/auth/createuser". Doesn't require Login  
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    //#region error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    //#endregion

    //#region Handling User Creation and error handling respective to the user

    try {
        // checking if the user with the email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        // securing password using salt, pepper and password hashing and also using (npm i bcryptjs) as friend
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // creating a user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // Working with jsonwebtoken so that the user doesn't have to login repeatedly
        const data = {
            id: user._id,
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});

//#endregion

module.exports = router;
