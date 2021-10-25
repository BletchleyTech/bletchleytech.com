const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: String,
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Contact = new model('Contact', contactSchema);

module.exports = Contact;