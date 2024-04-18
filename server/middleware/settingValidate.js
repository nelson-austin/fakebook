const validator = require('../helper/validate');

const settingRules = (req, res, next) => {
    const validationRule = {
        light_mode:'required|boolean',
        color_theme: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
              success: false,
              message: 'Validation failed',
              data: err
            });
          } else {
            next();
          }
    });
}

module.exports = {settingRules}