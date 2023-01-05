const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter course name"],
        trim: true,
        maxlength: [50, "Course name can not be more than 50 characters"]
    },
    code: {
        type: String,
        unique: true,
        index: true,
        required: [true, "Please enter course code "],
        trim: true,
        maxlength: [12, "The code can not be more than 12 digits"]
    },
    fees: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('Course', courseSchema);
