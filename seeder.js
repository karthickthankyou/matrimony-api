const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Activity = require('./models/Activity');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/profiles.json`, 'utf-8')
);

const activities = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/activities.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Profile.create(profiles);
    await Activity.create(activities);
    console.log('Data Created...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Profile.deleteMany();
    await Activity.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};


// Do it both.
const resetData = async () => {
  try {
    await deleteData();
    await importData();
  } catch (err) {
    console.log(err);
  }
}

(async function () {
  if (process.argv[2] === '-i') {
    await importData();
    process.exit();
  } else if (process.argv[2] === '-d') {
    await deleteData();
    process.exit();
  } else if (process.argv[2] === '-r') {
    await resetData();
    process.exit();
  } else {
    console.log(`Include argument. '-i': Create '-d': Delete '-r': Reset `);
    process.exit();
  }
})()
