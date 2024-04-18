const validator = require('../helper/validate');

const groupRules = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        description: 'required|string',
        owner: 'required|string'
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

module.exports = {
    groupRules
}