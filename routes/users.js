const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');
router.get('/', async (req, res) => {
  res.send('Registers a user');
});

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include valid email'),
    check('password', 'please enter a valid password'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'user already exists' });
      }

      user = new User({ name, email, password });
      user.password = await bcrypt.hash(password, 12);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  }
);
module.exports = router;
