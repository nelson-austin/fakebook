const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GroupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String, 
        required: true
    },
    owner:{
        type: String,
        ref: 'User',
        required: true
    }
    // ,
    // users:{
    //     type: Array,
    //     required: true
    // },
    // number_members:{
    //     type: Number,
    //     required: true
    // }
})

const groupModel = mongoose.model("Group", GroupSchema);
module.exports = groupModel;