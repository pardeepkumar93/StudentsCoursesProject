const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female']
    },
    address: {
        type: String,
        required: false,
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'courses'
        }
    ]
}, { timestamps: true });

const Student = mongoose.model('students', StudentSchema);

module.exports = Student;