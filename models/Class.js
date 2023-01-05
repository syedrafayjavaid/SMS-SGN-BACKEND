const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Class name is required"],
        trim: true,
        maxlength: [50, "Course name can not be more than 50 characters"]
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
        require: [true, "Course id is required"],

    },
    instructorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Teacher",
        require: [true, "Teacher id is required"],
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: ["active", "canceled", "expired"]
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

module.exports = mongoose.model('Class', classSchema);
