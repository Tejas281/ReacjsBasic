const express = require('express');
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/'));
app.use('/uploads', express.static('uploads'));

app.post(
  '/profile-upload-single',
  upload.single('profile-file'),
  function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file));
    var response = '<a href="/">Home</a><br>';
    response += 'Files uploaded successfully.<br>';
    response += `<img src="${req.file.path}" /><br>`;
    return res.send(response);
  }
);
