require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
// mongodb+srv://tejas281:tejas281@cluster0.g8uoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      gender,
      password,
      confirm_password,
    } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log('user', user);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        firstName,
        lastName,
        email,
        phone,
        date,
        gender,
        password,
        confirm_password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

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
      res.status(500).send('Server error');
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    console.log('data not found', error);
  }
});
module.exports = router;
