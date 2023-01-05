const Teacher = require("../models/Teacher");
const sendTokenResponse = require('../utilities/sendTokenResponse');


const getTeachers = async (req, res) => {

    const teacher = await Teacher.find();
    res.status(200).json({
        success: true,
        count: teacher.length,
        data: teacher,
    });

}

const getTeacher = async (req, res) => {

    try {

        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            res.status(404).json({
                success: false,
                error: `Teacher record not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: teacher,
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }


}
// Register a teacher
const createTeacher = async (req, res) => {

    try {
        const teacher = await Teacher.create(req.body);
        res.status(200).json({
            success: true,
            data: teacher
        })

    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        }

        )
    }

}
// Login a teacher
const loginTeacher = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
            })
        }
        const teacher = await Teacher.findOne({ email }).select("+password");
        if (!teacher) {
            return res.status(401).json({
                success: false,
                error: `Teacher not found with the email ${email}`,
            })
        }

        const isMatch = await teacher.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: `Invalid credentials`,
            })
        }

        // JWT token
        sendTokenResponse(teacher, 200, res);



    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })

    }

}
const updateTeacher = async (req, res) => {

    const data = req.body;
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!teacher) {
            res.status(404).json({
                success: false,
                error: `Teacher record  not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: teacher,
            });

        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })

    }


}

const deleteTeacher = async (req, res) => {

    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
        res.status(404).json({
            success: false,
            error: `Teacher record not found with the id of ${req.params.id}`
        })
    }
    else {
        res.status(200).json({
            success: true,
            msg: `Teacher record deleted with the id ${req.params.id}`,
        });
    }


}


module.exports = { getTeachers, getTeacher, loginTeacher, createTeacher, updateTeacher, deleteTeacher }