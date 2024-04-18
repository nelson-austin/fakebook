const router = require("express").Router();
const groupController = require("../controllers/groupController");
const validate = require("../middleware/groupValidate");
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: `https://${process.env.ISSUER_BASE_URL}`
});

if (process.env.ENVIRONMENT == "testing"){
    // GET /group/
    // GET /group/:groupId
    router.get("/", groupController.getGroups);
    router.get("/:id", groupController.getGroupById);

    // //POST /group
    router.post("/", validate.groupRules, groupController.createGroup);

    // PUT /group/:groupId
    router.put("/:_id", validate.groupRules, groupController.updateGroup);



    // DELETE /group/:groupId
    router.delete("/:_id", groupController.deleteGroup);
}else{
    router.get("/", groupController.getGroups);
    router.get("/:id", groupController.getGroupById);

    // //POST /group
    router.post("/", validate.groupRules, checkJwt, groupController.createGroup);

    // PUT /group/:groupId
    router.put("/:_id", validate.groupRules, checkJwt, groupController.updateGroup);



    // DELETE /group/:groupId
    router.delete("/:_id", checkJwt, groupController.deleteGroup);

}




module.exports = router;