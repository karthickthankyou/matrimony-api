const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const profiles = require('./routes/profiles');
const users = require('./routes/users');
const auth = require('./routes/auth');
const activies = require('./routes/activities');

const { connectDB } = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/activities', activies);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
})


// Exit process on unhandled rejections.
process.on('unhandledRejection', (err, promise) => {
  console.log(`${err.message}`);
  server.close(() => process.exit());
})
