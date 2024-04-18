const settingsModel = require("../models/settingsModel")
const dotenv = require("dotenv");
dotenv.config();
const { ObjectId } = require('mongodb');

const createSettings = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        console.log(user_id);
        const { light_mode, color_theme } = req.body;
        const settingsInfo = await settingsModel.create({
        user_id, light_mode, color_theme
        });
        // console.log(messages);
        if (settingsInfo) {
        res.status(201).send(`${settingsInfo}`);
        }
    } catch (err) {
        if (err) throw err;
    }
}

const getSettingsByUserId = async (req, res) => {
    try {
        const settingsInfo = await settingsModel.findOne({user_id: req.params.user_id});
        // console.log(messages);
        if (settingsInfo) {
            res.status(200).json(settingsInfo);
        }
    } catch (err) {
        if (err) throw err;
    }
}

const updateSettings = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { light_mode, color_theme } = req.body
        if (!user_id) {
            return res.status(400).json("User ID is missing in request parameters.");
          }
    
        //   if (!ObjectId.isValid(user_id)) {
        //     return res.status(400).json("Must use a valid user id to update a post.");
        //   }
          
          const updatedSettings = await settingsModel.findOneAndUpdate(
            { user_id: user_id },
            { light_mode, color_theme},
            { new: true } // returns the updated document instead of the original document
          );
      
          if (!updatedSettings) {
            return res.status(404).json("Post not found");
          }
      
          res.status(200).json(updatedSettings);
        } catch (err) {
          if (err) throw err;
        }
}

const deleteSettings = async (req, res) => {
    try {
        const settingsInfo = await settingsModel.findOneAndDelete({user_id: req.params.user_id})
        // console.log(messages);
        if (settingsInfo) {
            res.status(200).json(settingsInfo);
        }
    }
    catch (err) {
        if (err) throw err;
    }
}

module.exports = { getSettingsByUserId, createSettings, updateSettings, deleteSettings };