import mongoose from "mongoose";

const VideoCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    numberOfVideoHours: {
        type: Number,
        required: true
    },
    numberOfExercises: {
        type: Number,
        required: true
    },
    numberOfHoursWork: {
        type: Number,
        required: true
    },
    knowledgeList: {
        type: Array,
        required: true,
        default: []
    },
    requirements: {
        type: Array,
        required: true,
        default: []
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    welcomeVideo: {
        type: String,
        required: true
    },
    sections: [
        {
            name: {
                type: String,
                required: true
            },
            videoSources: [
                {
                    type: Object
                }
            ],
            exercises: [
                {
                    exerciseCode: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    },
                    orderNumber: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ]
},
    { strict: false }
);


export default mongoose.model("video_courses", VideoCourseSchema);
