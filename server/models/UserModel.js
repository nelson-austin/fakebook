const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    given_name: {
        type: String,
        required: false
    },
    family_name: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
    },
    day_joined: {
        type: Number,
        required: true,
    },
    groups: {
        type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
        ref: 'Group' // Reference to the Group collection
    },
    sub: {
        type: String,
        required: true
    }


}, {timestamps: true});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;