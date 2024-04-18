const groupModel = require('../models/groupModel');
const dotenv = require("dotenv");
dotenv.config();
const { ObjectId } = require('mongodb');

const createGroup = async (req, res) => {
    try {
        const { name, description, owner } = req.body;
        const groupInfo = await groupModel.create({
        name, description, owner
        });
        // console.log(messages);
        if (groupInfo) {
            console.log(groupInfo);
        res.status(201).json(`${JSON.stringify(groupInfo)}`);
        }
    } catch (err) {
        if (err) throw err;
    }
};

const getGroupById = async (req, res) => {
    try {
        console.log(req.params.id);
        const groupInfo = await groupModel.findOne({_id: req.params.id});
        
        // console.log(messages);
        if (groupInfo) {
            res.status(200).json(groupInfo);
        }
    } catch (err) {
        if (err) throw err;
    }
}

const getGroups = async (req, res) => {
    // console.log("getGroups");
    try{
       // console.log("getGroups");
        const groups = await groupModel.find();
        if(groups){
            res.status(200).json(groups);
        }

    }
    catch(err){
        if(err) throw err;
    }
}

const updateGroup = async (req, res) => {
    try {
        const groupInfo = await req.params._id;
        console.log(groupInfo);
        // console.log(messages);
        if (groupInfo) {
            res.status(200).json(groupInfo);
        }
        // if (!ObjectId.isValid(groupInfo)) {
        //     return res.status(400).json("Must use a valid post id to update a post.");
        //   }
        const { name, description, owner } = req.body;
        console.log(name, description);
    const updatedGroup = await groupModel.findByIdAndUpdate(
        { _id: groupInfo },
        { $set: { name, description, owner } },
        // { new: true } // returns the updated document instead of the original document
    );
      if (!updatedGroup) {
        return res.status(404).json("Group not found");
      }
  
      res.status(200).json(updatedGroup);
    }
    catch (err) {
        if (err) throw err;
    }
}

const deleteGroup = async (req, res) => {
    try {
        const groupInfo = await groupModel.findOneAndDelete({_id: req.params._id})
        // console.log(messages);
        if (groupInfo) {
            res.status(200).json(groupInfo);
        }
    }
    catch (err) {
        if (err) throw err;
    }
}

module.exports = { getGroups, getGroupById, createGroup, updateGroup, deleteGroup };