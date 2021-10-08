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
const Contact = require('../models/Contact');
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
    const result = await User.find()
    res.send(result);
  } catch (error) {
    console.log('data not found', error);
  }
});

router.get('/usersdata', async (req, res) => {
    let result =  (await User.find()).length;
    res.json(result);
  
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


// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
router.put('/:_id',async (req, res) => {
	const errors = validationResult(req);
  
  if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const {  firstName,
        lastName,
        email,
        phone,
        date,
        gender,
        password,
        confirm_password,
        profilefile } = req.body;

	// Build contact object
	const contactFields = {};
	if ( firstName) contactFields. firstName =  firstName;
	if (lastName) contactFields.lastName = lastName;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (date) contactFields.date = date;
	if (gender) contactFields.gender = gender;
	if (password) contactFields.password = password;
	if (confirm_password) contactFields.confirm_password = confirm_password;
	if (profilefile) contactFields.profilefile = profilefile;
 
  const  _id  = req.params._id;
  console.log("id is",req.params)
	try {
 
		const users = await User.findOne({_id});
		if (!users) return res.status(404).json({ msg: 'user not found' });

		// Make sure user owns contact
    //console.log(users)
    
		 await User.findByIdAndUpdate(_id,
			{ $set: contactFields },
			{ new: true }
   
    );
    res.json(users)
		
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// router.put('/:id', function (req, res) {
//   var id = req.params.id;
//   const {   firstName,
//     lastName,
//     email,
//     phone,
//     date,
//     gender,
//     password,
//     confirm_password,
//     profilefile } = req.body;

// // Build contact object
// const contactFields = {};
// if ( firstName) contactFields. firstName =  firstName;
// if (lastName) contactFields.lastName = lastName;
// if (email) contactFields.email = email;
// if (phone) contactFields.phone = phone;
// if (date) contactFields.date = date;
// if (gender) contactFields.gender = gender;
// if (password) contactFields.password = password;
// if (confirm_password) contactFields.confirm_password = confirm_password;
// if (profilefile) contactFields.profilefile = profilefile;
// try{
//  let user =  User.findById(id);
//  if (!user) return res.status(404).json({ msg: 'Contact not found' });

//  if (user.toString() !== req.user.id)
//  return res.status(401).json({ msg: 'Not authorized' });

// user =  User.findByIdAndUpdate(
//  req.params.id,
//  { $set:  contactFields},
//  { new: true }
// );
// }
// catch (err) {
//   console.error(err.message);
//   res.status(500).send('Server error');
// }
// //  .exec(function (err, results) {

// //     if (err) return console.error(err);
// //     try {
// //       res.json(results);
// //       console.log(results);
// //     } catch (error) {
// //       console.log('errror getting results');
// //       console.log(error);
// //     }
// //   });
// });

router.delete('/delete/:_id',async (req, res) => {
const   _id   = req.params._id;
console.log("id is",req.params)
  try {
		const users = await User.findOne({_id});
    console.log("data",users)
		if (!users) return res.status(404).json({ msg: 'User not found' });

		// Make sure user owns contact
	
    await User.findByIdAndRemove(_id);

		res.json({ msg: 'users removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	
	}
});


module.exports = router;
