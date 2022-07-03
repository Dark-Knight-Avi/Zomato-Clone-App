const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the users Schema
const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    
})

module.exports = mongoose.model('user', UserSchema, 'user');   // exporting the model