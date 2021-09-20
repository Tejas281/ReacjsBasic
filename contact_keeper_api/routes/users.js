require('dotenv').config();
const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const { response } = require('express');
// mongodb+srv://tejas281:tejas281@cluster0.g8uoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// @route    POST api/users
// @desc     Register user
// @access   Public

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './routes/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.use('/uploads', express.static('uploads'));

router.post(
  '/',
  upload.single('profilefile'),

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
    const profilefile = req.file.filename;

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
        profilefile,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          profilefile: req.file.filename,
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

      console.log(JSON.stringify(req.file.filename));
      var response = JSON;
      response += 'Files uploaded successfully.<br>';
      response += `<img src="${req.file.path}" /><br>`;
      return res.send(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// response.filename
router.get('/', async (req, res, next) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    console.log('data not found', error);
  }
});

// router.get('/:id', async (req, res, next) => {
//   var id = req.params.id;
//   try {
//     const result = await User.findById({ id: id });
//     res.json(result);
//   } catch (error) {
//     console.log('data not found', error);
//   }
// });

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  User.findById(id).exec(function (err, results) {
    if (err) return console.error(err);
    try {
      res.json(results);
      console.log(results);
    } catch (error) {
      console.log('errror getting results');
      console.log(error);
    }
  });
});

module.exports = router;
