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

//#region ROUTE 1: Get All the Classes: GET "/api/sessions/fetchallsessions/". Login required
router.get('/fetchallsessions/', fetchuser, async (req, res) => {
    try {
        const sessions = await Sessions.find({ user: req.user.id });
        res.json(sessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});
//#endregion

//#region ROUTE 2: Add a new Class using: POST "/api/sessions/addsession". Login required
router.post('/addsession', fetchuser, async (req, res) => {
    try {
        const { zoomid, title, desc, dateToJoin, coach, price } = req.body;

        //#region Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        //#endregion

        const sessions = new Sessions({
            zoomid, title, desc, dateToJoin, coach, price, user: req.user.id
        });

        const savedSession = await Sessions.save();
        res.json(savedSession);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});
//#endregion

module.exports = router;
