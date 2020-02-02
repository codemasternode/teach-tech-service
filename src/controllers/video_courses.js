import VideoCourses from '../models/video_courses'
import User from '../models/users'
import { getSignedURL } from '../services/getAccessToPrivateContent'

//get course (public)
export async function getCourseByName(req, res) {
    let course = await VideoCourses.findOne({
        name: {
            $regex: req.params.courseName,
            $options: "i"
        }
    })

    if (!course) {
        return res.status(404).send({
            msg: "Course not found"
        })
    }

    let copyOfCourse = JSON.parse(JSON.stringify(course))
    for (let i = 0; i < copyOfCourse.sections.length; i++) {
        for(let k = 0; k < copyOfCourse.sections[i].videoSources.length; k++) {
            copyOfCourse.sections[i].videoSources[k].source = undefined
        }
        const numberOfExercises = copyOfCourse.sections[i].exercises.length
        copyOfCourse.sections[i].exercises = undefined
        
        copyOfCourse.sections[i] = {
            ...copyOfCourse.sections[i],
            numberOfExercises
        }
        
    }
    res.send({ course: copyOfCourse })
}

//get course section (private)
export async function getCourseSectionByNumber(req, res) {
    const user = await User.findOne({
        email: req.user.email
    })
    if (!user) {
        return res.status(401).send({ msg: "User not found" })
    }
    console.log(user)
    let course = null
    for (let i = 0; i < user.videoCourses.length; i++) {
        if (user.videoCourses[i] == req.params.courseName) {
            course = user.videoCourses[i]
        }
    }

    if (course === null) {
        return res.status(400).send({
            msg: "User doesn't have course"
        })
    }


    course = await VideoCourses.findOne({ name: req.params.courseName })

    if (!course) {
        return res.status(404).send({
            msg: "Course doesn't exist"
        })
    }

    let section = null
    for (let i = 0; i < course.sections.length; i++) {
        if (course.sections[i].name === req.params.sectionName) {
            section = course.sections[i]
        }
    }

    if (section === null) {
        return res.status(404).send({
            msg: "Course doesn't have section"
        })
    }
    const promises = []
    for (let k = 0; k < section.videoSources.length; k++) {
        promises.push(getSignedURL(section.videoSources[k].source))
    }

    Promise.all(promises).then(signedUrls => {

        for (let i = 0; i < signedUrls.length; i++) {
            section.videoSources[i].source = signedUrls[i]
        }

        res.send({ section })
    })

}

//get courses (public)
export async function getCourses(req, res) {
    const videoCourses = await VideoCourses.find({}, { name: 1, price: 1, description: 1 })
    res.send({ videoCourses })
}

export async function buyCourse(req, res) {

}