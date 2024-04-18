const TestModel = require("../models/TestModel");
const dotenv = require("dotenv");
dotenv.config();
const { ObjectId } = require('mongodb');


const createTest = async (req, res) => {
    try {
      const { name } =
        req.body;
      const test = await TestModel.create({
       name
      });
      // console.log(messages);
      if (test) {
        res.status(201).send(`${test}`);
      }
    } catch (err) {
      if (err) throw err;
    }
  };

  const getTests = async (req, res) => {
    try {
      const tests = await TestModel.find({});
      // console.log(messages);
      if (tests) {
        res.status(200).json(tests);
      }
    } catch (err) {
      if (err) throw err;
    }
  };


  module.exports = {
    getTests,
    createTest,
  };