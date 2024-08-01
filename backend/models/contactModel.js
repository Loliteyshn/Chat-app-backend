const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    }
})

module.exports = mongoose.model('Contacts', ContactSchema)