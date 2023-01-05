const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter admission name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    maxAdmissions: {
        type: Number,
        required: true,
    },
    minAdmissions: {
        type: Number,
        required: true,
    },
    minAge: {
        type: Number,
        required: true,
    },
    term: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Term name can not be more than 50 characters"]
    },
    academicYear: {
        type: String,
        required: true,
        trim: true,
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
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
    },

})
module.exports = mongoose.model('Admission', admissionSchema);
