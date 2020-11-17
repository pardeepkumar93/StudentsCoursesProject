const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;