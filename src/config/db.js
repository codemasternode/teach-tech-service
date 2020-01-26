import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import uuid from "uuid/v1";
import { loadData } from "../services/loadData";
import Users from '../models/users'

export default URI => {
  const dbOptions = {
    poolSize: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  mongoose.promise = global.promise
  mongoose.connect(URI, dbOptions, async err => {
    if (err) {
      throw new Error(`Error while trying to connect MongoDB ${err}`);
    }
    console.log(`Connected to MongoDB`);
    const data = await loadData([
      "mockData/users.json"
    ]);

    await Promise.all([
      Users.deleteMany({})
    ]);
    const users = data[0]
    for (let i = 0; i < users.length; i++) {
      await Users.create(users[i])
    }
  });
};
