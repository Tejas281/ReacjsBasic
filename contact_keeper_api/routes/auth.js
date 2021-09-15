const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged user
// @access   Private

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await User.findById(req.user.id);
    res.json(result);
    console.log(result);
  } catch (error) {
    console.log('data not found', error);
  }
});

// router.get('/:id', auth, function (req, res, next) {
//   var id = req.params.id;
//   User.findById(id).exec(function (err, results) {
//     if (err) return console.error(err);
//     try {
//       res.json(results);
//       console.log(results);
//     } catch (error) {
//       console.log('errror getting results');
//       console.log(error);
//     }
//   });
// });

// router.get('/email', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.email).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email);
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log(user.id);

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

module.exports = router;
