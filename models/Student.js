const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "Please enter Full name"],
        trim: true,
        maxlength: [50, "Full Name can not be more than 70 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter Full name"],
        trim: true,
        maxlength: [50, "Full Name can not be more than 70 characters"]
    },
    rollNumber: {
        type: String,
        required: [true, "Please enter roll number"],
        unique: true,
        trim: true,
        maxlength: [50, "Roll no can not be more than 20 characters"]
    },
    gender: {
        type: String,
        required: [true, 'Please enter the gender'],
        enum: ["male", "female", "other"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email address",
        ],
    },
    password: {
        type: String,
        minlength: [6, "Password length should be minimum 6 character"]
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    familyBusiness: {
        type: String,
        trim: true
    },
    familyIncome: {
        type: Number,
        trim: true
    },
    birthDate: {
        type: Date,
        default: Date.now
    },
    guardianName: {
        type: String,
        rquired: [true, "Guardian's name is required"],
        trim: true,
    },
    guardianCnic: {
        type: String,
        rquired: [true, "Guardian's cinc is required"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password length should be minimum 6 character"],
    },
    guardianRelation: {
        type: String,
        rquired: [true, "Guardian's realtion is required"],
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
    parentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Parent",
    },
});



// Encrypting user password
studentSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("The password before save has", this.password);
});


// sign JWT and return
studentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match User password
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('Student', studentSchema);
