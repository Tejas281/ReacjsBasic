require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

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
app.use('/api/contacts', require('./routes/contacts'));
// app.use('/api/userslist', require('./routes/alluser'));
const PORT = process.env.PORT || 5000;
// Add headers before the routes are defined

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
