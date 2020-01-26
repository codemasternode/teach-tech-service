import express from "express";
import { confirmUser, createUser, getMyCourses, getProfile } from "../controllers/users";
import { verifyToken } from '../middlewares/verifyToken'

const router = express.Router();

export default () => {
  router.post("/create-user", createUser);
  router.post("/confirm", confirmUser)
  router.get("/mycourses", verifyToken, getMyCourses)
  router.get("/profile", verifyToken, getProfile)
  return router;
};
