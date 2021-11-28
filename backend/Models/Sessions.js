const mongoose = require('mongoose');

const SessionsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price: {
        type: String,
        default: 'free'
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    dateToJoin: {
        type: String,
        required: true
    },
    coach:{
        type: String,
        default: 'Shipy Singh'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const Sessions = mongoose.model('sessions', SessionsSchema);

module.exports = Sessions;
