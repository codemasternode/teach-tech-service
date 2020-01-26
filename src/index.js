import express from "express";
import cors from "cors";
import mongodbConnection from "./config/db";
import webStatsRoutes from "./routes/websiteStats";
import path from 'path'
import contactRoutes from './routes/contact'
import usersRoutes from './routes/users'
import authRoutes from './routes/auth'
import mailer from "./config/mailer";
import dotenv from "dotenv/config";
import cookieParser from 'cookie-parser'

let PORT = process.env.PORT || 5000,
  MONGO_DB_URL = process.env.MONGO_DB_URL
const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));
if (process.env.MODE === "DEV") {
  PORT = 5000
  MONGO_DB_URL = `mongodb://localhost:27017/tts`
  app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:5000'] }));
} else {
  app.use(cors({ credentials: true, origin: ['http://localhost:5000', 'http://localhost:3000'] }));
}

mongodbConnection(MONGO_DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/api/web-stats", webStatsRoutes());
app.use("/api/contact", contactRoutes())
app.use("/api/users", usersRoutes())
app.use("/api/auth", authRoutes())

app.get('*', (req, res) => {
  console.log(path.join(__dirname, '../client/build/index.html'))
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

process.on("exit", () => {
  server.close();
});


export default app;
