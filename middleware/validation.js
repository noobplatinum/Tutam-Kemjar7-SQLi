const { body, validationResult } = require('express-validator');

exports.validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-50 alphanumeric characters'),
  body('password')
    .isLength({ min: 1, max: 100 })
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    next();
  }
];

exports.validateUserId = [
  body('user_id')
    .isInt({ min: 1 })
    .withMessage('Invalid user ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    next();
  }
];

exports.validateFlag = [
  body('flag')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Invalid flag format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    next();
  }
];
