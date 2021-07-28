const mongoose = require('mongoose');
const config = require('config');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoURI = config.get('mongoURI');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const connectDB = async () => {
  // Mocking Database if environment is 'test'
  if (process.env.NODE_ENV === 'test') {
    try {
      const mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri(), options);
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await mongoose.connect(mongoURI, options);
      console.log('MongoDb Connected.');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.disconnect();
    } else {
      await mongoose.disconnect();
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { connectDB, disconnectDB };
