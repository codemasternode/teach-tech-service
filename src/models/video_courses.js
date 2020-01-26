import mongoose from "mongoose";

const VideoCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sections: [
        {
            name: {
                type: String,
                required: true
            },
            videoSource: {
                type: String,
                required: true
            },
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
