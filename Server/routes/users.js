require("dotenv").config();
const express = require("express");
const multer = require("multer");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Product = require("../models/Product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./routes/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const proImg = multer.diskStorage({
  destination: "./routes/products",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const products = multer({storage:proImg});

router.get('/users',async(req,res)=>{
  try{
  const result = await User.find()
  res.send(result)
  }
  catch(err){
    console.log("data is Not Found",err)
  }
})
// router.get("/pagination", async (req, res) => {
//   let { page=4, limit=0, size=2, pre=1, next=0, skip } = req.query;
//   const count = await User.countDocuments();
//   try {
//     if (page<=0) {
//       page = 1;
//     }
//     if (!skip) {
//       skip = page * size;
//     }
//     if(0 < pre)
//     {
//       pre = page-1
//     }
//     if(!next)
//     {
//       next = page +1
//     }
      
//     counts = count - skip

//     const limit = parseInt(size);
//     const result = await User.find().limit(limit).skip(skip);
    
//     res.send({ page, size, limit, data: result,counts,pre,next});
//   } catch (err) {
//     console.log("data error", err);
//   }
// });

router.use("/uploads", express.static("uploads"));
router.use("/products",express.static("product"))
router.post(
  "/",
  upload.single("profilefile"),

  [
    check("firstName", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
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
      console.log("user", user);
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
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
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      console.log(JSON.stringify(req.file.filename));
      var response = JSON;
      response += "Files uploaded successfully.<br>";
      response += `<img src="${req.file.path}" /><br>`;
      return res.send(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

const getPageData = ({ page = 0, limit = 2 }) => {
  page = parseInt(page);
  if (!limit) {
    limit = 2;
  }
  limit = parseInt(limit);
  // page 0 hoy tyare skip 0
  let skip = page === 0 ? 0 : page * limit;
  return { page, limit, skip };
};
const getPageInfo = ({ count = 0, limit, page }) => {
  count = parseInt(count);
  const info = { count };
  let totalPages = count / limit - 1;
  if (page >= 1) {
    info.prev = page - 1;
  }
  if (page < totalPages) {
    info.next = page + 1;
  }
  return info;
};
// response.filename
router.get("/pages", async (req, res, next) => {
  try {
    let { page, limit, skip } = getPageData(req.query);
    const count = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);
    const info = getPageInfo({ count, limit, page });
    res.send({
      info,
      users,
    });
  } catch (error) {
    console.log("data not found", error);
  }
});

router.get("/usersdata", async (req, res) => {
  let result = (await User.find()).length;
  res.json(result);
});

router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  console.log("ID", id);
  User.findById(id).exec(function (err, results) {
    if (err) return console.error(err);
    try {
      res.json(results);
      console.log(results);
    } catch (error) {
      console.log("errror getting results");
      console.log(error);
    }
  });
});

// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
router.put("/:_id", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    gender,
    password,
    confirm_password,
    profilefile,
  } = req.body;

  const contactFields = {};
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (date) contactFields.date = date;
  if (gender) contactFields.gender = gender;
  if (password) contactFields.password = password;
  if (confirm_password) contactFields.confirm_password = confirm_password;
   if (profilefile) contactFields.profilefile = profilefile;
   
  const _id = req.params._id;
  console.log("id is", req.params);
  try {
    const users = await User.findOne({ _id });
    if (!users) return res.status(404).json({ msg: "user not found" });
    await User.findByIdAndUpdate(_id, { $set: contactFields }, { new: true });
    res.json(users);
    console.log(users)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:_id", async (req, res) => {
  const _id = req.params._id;
  console.log("id is", req.params);
  try {
    const users = await User.findOne({ _id });
    console.log("data", users);
    if (!users) return res.status(404).json({ msg: "User not found" });
    await User.findByIdAndRemove(_id);
    res.json({ msg: "users removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});




module.exports = router;
