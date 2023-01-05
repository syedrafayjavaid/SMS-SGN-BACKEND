const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
    },
    classId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Class",
    },
    attendanceDate: {
        type: Date,
        required: true,
    },
    attendanceStatus: {
        type: String,
        required: true,
        trim: true,
        enum: ["present", "absent", "leave"]
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "The creater's name cannot be more than 50 characters long"]
    },
    modifiedOn: {
        type: Date
    },
    modifiedBy: {
        type: String,
        trim: true,
        maxlength: [50, "The modifiers  name cannot be more than 50 characters long"]
    },

})
module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);
