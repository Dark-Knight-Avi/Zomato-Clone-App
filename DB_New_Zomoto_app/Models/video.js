const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the users Schema
const videoSchema = new Schema({
    title:String,
    des:String,
   
    
    
});

module.exports = mongoose.model('video', videoSchema, 'videos'); 