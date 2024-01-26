const mongoose = require('mongoose');

let UserNameSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        default: '123456'
    }
});

let UserNameModel = mongoose.model('users', UserNameSchema);

module.exports = UserNameModel;