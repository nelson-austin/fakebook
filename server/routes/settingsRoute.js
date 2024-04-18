const router = require("express").Router();
const settingsController = require("../controllers/settingsController");
const validate = require("../middleware/settingValidate");
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: `https://${process.env.ISSUER_BASE_URL}`
});

if (process.env.ENVIRONMENT == "testing"){
    
    //GET/settings
    router.get("/:user_id", settingsController.getSettingsByUserId);
    //POST/settings
    router.post("/:user_id", validate.settingRules, settingsController.createSettings);

    //PUT/settings/:settingId
    router.put("/:user_id", validate.settingRules, settingsController.updateSettings);

    //DELETE/settings/:settingId
    router.delete("/:user_id", settingsController.deleteSettings);
}else{
    //GET/settings
    router.get("/:user_id", checkJwt, settingsController.getSettingsByUserId);
    //POST/settings
    router.post("/:user_id", checkJwt, validate.settingRules, settingsController.createSettings);

    //PUT/settings/:settingId
    router.put("/:user_id", checkJwt, validate.settingRules, settingsController.updateSettings);

    //DELETE/settings/:settingId
    router.delete("/:user_id", checkJwt, settingsController.deleteSettings);
}


module.exports = router;
