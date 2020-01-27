import express from "express";
import { getCourseByName, getCourseSectionByNumber, getCourses } from "../controllers/video_courses";
import { verifyToken } from '../middlewares/verifyToken'

const router = express.Router();

export default () => {
  router.get("/courses", getCourses)
  router.get("/courses/:courseName", getCourseByName)
  router.get("/courses/:courseName/:sectionName", verifyToken, getCourseSectionByNumber)
  return router;
};
