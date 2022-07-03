const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const ItemsSchema = new Schema({
    name:String,
    description:String,
    restaurantId:String,
    price:String,
    qty:Number,
    image:String
    
});

module.exports = mongoose.model('menuItems', ItemsSchema, 'items');   // exporting the model