const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const profiles = require('./routes/profiles');
const users = require('./routes/users');
const auth = require('./routes/auth');

const { connectDB } = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express();

connectDB();
app.use(express.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
})


// Exit process on unhandled rejections.
process.on('unhandledRejection', (err, promise) => {
  console.log(`${err.message}`);
  server.close(() => process.exit());
})
