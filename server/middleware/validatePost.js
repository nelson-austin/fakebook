const validator = require('../helper/validate');

const postRules = (req, res, next) => {
  const validationRule = {
    user_id: 'required|string',
    group_id: 'required',
    content: 'required|string',
    likes: 'numeric',
    comments: 'array',
    'comments.*.comment': 'required|string'
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

module.exports = { postRules };