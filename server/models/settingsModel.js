const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingsSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    light_mode:{
        type: Boolean,
        required: true
    },
    color_theme:{
        type: String,
        required: true
    }
})

const settingsModel = mongoose.model("Settings", settingsSchema);
module.exports = settingsModel;
