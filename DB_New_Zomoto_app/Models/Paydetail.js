const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the users Schema
const detailsSchema = new Schema({
    name:String,
    mobile:String,
    email:String,
    address:String,
    amount:String,
    shop:String,
    shopName:String,
    accountuser:String,
    meal1:String,
    cost1:String,
    img1:String,
    meal2:String,
    cost2:String,
    img2:String

    
});

module.exports = mongoose.model('PayDetail', detailsSchema, 'PayDetails'); 

