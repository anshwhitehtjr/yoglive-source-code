const express = require('express');
const { connect } = require('mongoose');
const app = express();
const port = 5000;
const connectToMongo = require('./db');
var cors = require('cors');

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./route/auth'));
app.use('/api/sessions', require('./route/sessions'));

// listening the app
app.listen(port, () => {
    console.log(`YogLive listening at http://localhost:${port}`);
});

connectToMongo();
