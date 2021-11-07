const { Schema, model } = require("mongoose");

const subscriberSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Subscriber = new model('Subscriber', subscriberSchema);

module.exports = Subscriber;