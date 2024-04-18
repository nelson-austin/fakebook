const router = require("express").Router();
const user = require('../controllers/UserController');
const validation = require('../middleware/validate');

router.get("/:id", user.getUser);

router.post("/", validation.userRules, user.createUserAndLogin);

router.put("/:id", validation.userUpdateRules, user.updateUser);

router.delete("/:id", user.deleteUser);

// Does not need to be validated since the groupId is declared as a mongodb object in the model
router.put("/addGroup/:id", user.addGroup);

module.exports = router;
