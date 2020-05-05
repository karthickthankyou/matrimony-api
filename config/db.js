const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`MONGO DB connected. ${conn.connection.host}`);
}


module.exports = { connectDB };
