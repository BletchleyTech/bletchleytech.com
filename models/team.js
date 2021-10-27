const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    socials: Object
});

const Member = new model('Member', memberSchema);

module.exports = Member;