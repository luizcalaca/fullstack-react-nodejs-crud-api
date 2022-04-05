import 'babel-polyfill'
import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
const request = supertest('http://127.0.0.1:3334');

describe('API test', () => {
  beforeAll(async () => {
    await mongoose.disconnect(); //necessary for having just one string connection
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /user', () => {
    it('Request using a mocked database MongoDB Memory instance', async () => {
      const res = await request.post('/user', {
        "name": "Master",
        "username": "MASTER"
      });

      expect(res.status).toBe(201);
    });
  });
});