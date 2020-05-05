const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const profiles = require('./routes/profiles');
const users = require('./routes/users');

const { connectDB } = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express();

connectDB();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/users', users);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
})


// Exit process on unhandled rejections.
process.on('unhandledRejection', (err, promise) => {
  console.log(`${err.message}`);
  server.close(() => process.exit());
})
