const validator = require('../helper/validate');

const userRules = (req, res, next) => {
  const validationRule = {
    email: 'required|string',
    given_name:'string',
    family_name:'string',
    name: 'required|string',
    picture: 'required|string',
    sub: 'required|string'
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
};

const userUpdateRules = (req, res, next) => {
  const validationRule = {
    email: 'required|string',
    given_name:'string',
    family_name:'string',
    name: 'required|string',
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
};

module.exports = {
  userRules,
  userUpdateRules
};