const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

}, {timestamps: true});

const TestModel = mongoose.model("Test", TestSchema);

module.exports = TestModel;