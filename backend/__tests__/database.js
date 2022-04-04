import { connect, connection } from 'mongoose';
import regeneratorRuntime from "regenerator-runtime";
import { MongoMemoryServer } from 'mongodb-memory-server';
let mongod = null;

const connectDB = async () => {
  try {
    let dbUrl = 'mongodb://127.0.0.1:27017/';
    if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    const conn = connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default { connectDB, disconnectDB };