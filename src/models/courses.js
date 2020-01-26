import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {},
    description: {},
    price: {}
},
    { strict: false }
);


export default mongoose.model("courses", CourseSchema);
