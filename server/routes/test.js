const {getTests, createTest} = require("../controllers/TestController");
const router = require("express").Router();

// const validation = require('../middleware/validate');

// const { auth, requiresAuth } = require('express-openid-connect');



router.get("/", getTests);

router.post("/", createTest);

module.exports = router;