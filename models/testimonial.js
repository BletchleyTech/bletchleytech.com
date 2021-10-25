const { Schema, model } = require("mongoose");

const testimonialSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    name: String,
    company: String
});

const Testimonial = new model('Testimonial', testimonialSchema);

module.exports = Testimonial;