import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import uuid from "uuid/v1";
import { loadData } from "../services/loadData";
import Users from '../models/users'
import VideoCourses from '../models/video_courses'

export default URI => {
  const dbOptions = {
    poolSize: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    replicaSet: "rs0"
  };
  mongoose.promise = global.promise
  mongoose.connect(URI, dbOptions, async err => {
    if (err) {
      throw new Error(`Error while trying to connect MongoDB ${err}`);
    }
    console.log(`Connected to MongoDB`);
    const data = await loadData([
      "mockData/users.json",
      "mockData/video_courses.json"
    ]);

    await Promise.all([
      Users.deleteMany({}),
      VideoCourses.deleteMany({})
    ]);
    const users = data[0]
    const videoCourses = data[1]

    for (let i = 0; i < videoCourses.length; i++) {
      await VideoCourses.create(videoCourses[i])
    }

    for (let i = 0; i < users.length; i++) {
      await Users.create(users[i])
    }
  });
};
