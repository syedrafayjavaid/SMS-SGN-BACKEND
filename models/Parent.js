const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const parentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "Please enter First name"],
        trim: true,
        maxlength: [50, "First Name can not be more than 70 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"],
        trim: true,
        maxlength: [50, "Last name can not be more than 70 characters"]
    },
    cnic: {
        type: String,
        required: [true, "Please enter cnic"],
        trim: true,
        maxlength: [50, "Last name can not be more than 15 digits"]
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
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password length should be minimum 6 character"]
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
        maxlength: [50, "The modifiers name cannot be more than 50 characters long"]
    },

});

// Encrypting user password
parentSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
parentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match User password
parentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('Parent', parentSchema);
