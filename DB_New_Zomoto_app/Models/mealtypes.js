const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const MealTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    meal_type: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('mealtype', MealTypeSchema, 'mealtype');   // exporting the model