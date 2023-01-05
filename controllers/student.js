const { default: mongoose } = require("mongoose");
const Student = require("../models/Student");
const sendTokenResponse = require('../utilities/sendTokenResponse');


const getStudents = async (req, res) => {

    const student = await Student.aggregate([

        {
            $lookup: {
                from: "parents",
                localField: "parentId",
                foreignField: "_id",
                as: "parent"
            }
        }

    ]);
    res.status(200).json({
        success: true,
        count: student.length,
        data: student,
    });

}

const getStudent = async (req, res) => {

    try {

        const student = await Student.aggregate([

            {
                $match: { studentId: mongoose.Types.ObjectId(req.param.id) }
            },
            {
                $lookup: {
                    from: "parents",
                    localField: "parentId",
                    foreignField: "_id",
                    as: "parent"
                }
            }
        ]);
        if (!student.length > 0) {
            res.status(404).json({
                success: false,
                error: `Student  record not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: student,
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

// Register a student
const createStudent = async (req, res) => {

    try {
        const student = await Student.create(req.body);
        res.status(200).json({
            success: true,
            data: student
        })

    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }

}
// Login a student
const loginStudent = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
            })
        }
        const student = await Student.findOne({ email }).select("+password");
        if (!student) {
            return res.status(401).json({
                success: false,
                error: `Student not found with the email ${email}`,
            })
        }

        const isMatch = await student.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: `Invalid credentials`,
            })
        }
        else {

            // JWT token
            sendTokenResponse(student, 200, res);
        }


    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })

    }

}

const updateStudent = async (req, res) => {

    const data = req.body;
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!student) {
            res.status(404).json({
                success: false,
                error: `Student record  not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: student,
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

const deleteStudent = async (req, res) => {

    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        res.status(404).json({
            success: false,
            error: `Student record not found with the id of ${req.params.id}`
        })
    }
    else {
        res.status(200).json({
            success: true,
            msg: `Student record deleted with the id ${req.params.id}`,
        });
    }


}



module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent, loginStudent }