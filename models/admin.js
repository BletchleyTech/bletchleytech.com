const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");
require("dotenv").config();

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});

adminSchema.plugin(encrypt, {secret: process.env.ADMIN, encryptedFields: ['pass']});

const Admin = new model('Admin', adminSchema);

module.exports = Admin;