const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const ResSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    mealtype_id:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('restaurant', ResSchema, 'restaurant');   // exporting the model