const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        required: true
    }
});

const Client = new model('Client', clientSchema);

module.exports = Client;