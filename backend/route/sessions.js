//#region Namespaces
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "AnShBaLaJiThAkUrIsAgOoDbOOY123123";
const Sessions = require('../Models/Sessions');
//#endregion

//#region ROUTE 1: Get All the Classes: GET "/api/sessions/fetchallsessions". Login required
router.get('/fetchallsessions', fetchuser, async (req, res) => {
    try {
        const sessions = await Sessions.find({ user: req.user.id });
        res.json(sessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});
//#endregion

module.exports = router;
