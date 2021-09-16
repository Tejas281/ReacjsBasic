require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
// const multer = require('multer');
console.log('process.env', process.env.MONGOURI);
// Connect Database
connectDB();
app.use(
  cors({
    origin: '*',
  })
);
// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
// app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/auth/email', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
//image upload code

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// app.use(express.static(__dirname + '/'));
// app.use('/uploads', express.static('uploads'));

// app.post(
//   '/profile-upload-single',
//   upload.single('profile-file'),
//   function (req, res, next) {
//     // req.file is the `profile-file` file
//     // req.body will hold the text fields, if there were any
//     console.log(JSON.stringify(req.file));
//     var response = '<a href="/">Home</a><br>';
//     response += 'Files uploaded successfully.<br>';
//     response += `<img src="${req.file.path}" /><br>`;
//     return res.send(response);
//   }
// );

// app.use('/api/userslist', require('./routes/alluser'));
const PORT = process.env.PORT || 5000;
// Add headers before the routes are defined

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
