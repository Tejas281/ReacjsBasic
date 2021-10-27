require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express('');
const cors = require('cors');

console.log('process.env', process.env.MONGOURI);
// Connect Database
connectDB();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('./routes/uploads'));
app.use('/products', express.static('./routes/products'));
app.use('/api/users', require('./routes/users'));

app.use('/api/cart',require('./routes/cart'))
app.use('/api/products',require('./routes/product'))
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

