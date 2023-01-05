const { default: mongoose } = require("mongoose");
const Attendance = require("../models/StudentAttendance");




const getAttendances = async (req, res) => {

    const attendance = await Attendance.aggregate([

        {
            $lookup:
            {
                from: "students",
                localField: "studentId",
                foreignField: "_id",
                as: "student"
            }
        }
        ,
        {
            $lookup:
            {
                from: "classes",
                localField: "classId",
                foreignField: "_id",
                as: "class"
            }
        },

    ]);
    res.status(200).json({
        success: true,
        count: attendance.length,
        data: attendance,
    });

}

const getAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.aggregate([

            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup:
                {
                    from: "students",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "student"
                }
            }
            ,
            {
                $lookup:
                {
                    from: "classes",
                    localField: "classId",
                    foreignField: "_id",
                    as: "class"
                }
            },

        ])

        if (!attendance) {
            res.status(404).json({
                success: false,
                error: `Attendance  record not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: attendance,
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


const getStudentAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.aggregate([

            {
                $match: { studentId: mongoose.Types.ObjectId(req.body.id) }
            },
            {
                $lookup:
                {
                    from: "students",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "student"
                }
            }
            ,
            {
                $lookup:
                {
                    from: "classes",
                    localField: "classId",
                    foreignField: "_id",
                    as: "class"
                }
            },

            {
                $sort: {
                    attendanceDate: -1
                }
            },

        ])

        if (!attendance.length > 0) {
            res.status(404).json({
                success: false,
                error: `Attendance record of student with id  ${req.body.id} not found`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: attendance,
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


const createAttendance = async (req, res) => {

    try {
        const attendance = await Attendance.create(req.body);
        res.status(200).json({
            success: true,
            data: attendance
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



const updateAdmission = async (req, res) => {

    const data = req.body;
    try {
        const admission = await Admission.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!admission) {
            res.status(404).json({
                success: false,
                error: `Admission record  not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: admission,
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

const deleteAdmission = async (req, res) => {

    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
        res.status(404).json({
            success: false,
            error: `Admission record not found with the id of ${req.params.id}`
        })
    }
    else {
        res.status(200).json({
            success: true,
            msg: `Admission record deleted with the id ${req.params.id}`,
        });
    }
}



module.exports = { getAttendances, getAttendance, createAttendance, getStudentAttendance, deleteAdmission }