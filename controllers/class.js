const { default: mongoose } = require("mongoose");
const Classes = require("../models/Class");


const getClasses = async (req, res) => {

    const classes = await Classes.aggregate([

        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course"
            }
        },
        {
            $lookup: {
                from: "teachers",
                localField: "instructorId",
                foreignField: "_id",
                as: "teacher"
            }
        }

    ]);
    res.status(200).json({
        success: true,
        count: classes.length,
        data: classes,
    });

}

const getClass = async (req, res) => {
    try {

        const classes = await Classes.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.param.id) }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "course"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "instructorId",
                    foreignField: "_id",
                    as: "teacher"
                }
            }
        ]);
        if (!classes.length > 1) {
            res.status(404).json({
                success: false,
                error: `Class not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: classes,
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

const getSpecificClasses = async (req, res) => {
    try {
        let startDate = new Date(req.body.startDate);
        // Setting the hours to the start of the day
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(req.body.endDate);
        // Setting the date to the start of next date
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
        const classes = await Classes.find({ startDateTime: { $gt: startDate }, endDateTime: { $lt: endDate } });
        res.status(200).json({
            success: true,
            count: classes.length,
            data: classes,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }




}

const getDailyClasses = async (req, res) => {
    try {
        let startDate = new Date(req.body.startDate);
        // Setting the hours to the start of the day
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(req.body.endDate);
        // Setting the date to the start of next date
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
        let classes = await Classes.aggregate([
            {
                $match: {
                    startDateTime: { $gt: startDate }, endDateTime: { $lt: endDate }
                }
            },
            {
                $group: {
                    _id: "$startDateTime",
                    classes: { '$push': '$$ROOT' },
                    // count: { $sum: 1 },
                }
            }
        ]);

        // const classes = await Classes.find({ startDateTime: { $gt: startDate }, endDateTime: { $lt: endDate } });
        res.status(200).json({
            success: true,
            data: classes,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }




}

const createClass = async (req, res) => {

    try {
        const classes = await Classes.create(req.body);
        res.status(200).json({
            success: true,
            data: classes
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

const updateClass = async (req, res) => {

    const data = req.body;
    try {
        const classes = await Classes.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!classes) {
            res.status(404).json({
                success: false,
                error: `Class not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: classes,
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

const deleteClass = async (req, res) => {

    const classes = await Classes.findByIdAndDelete(req.params.id);
    if (!classes) {
        res.status(404).json({
            success: false,
            error: `Class not found with the id of ${req.params.id}`
        })
    }
    else {
        res.status(200).json({
            success: true,
            msg: `Class deleted with the id ${req.params.id}`,
        });
    }


}

module.exports = { getClasses, getClass, getSpecificClasses, getDailyClasses, createClass, updateClass, deleteClass }