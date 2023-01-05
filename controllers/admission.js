const { default: mongoose } = require("mongoose");
const Admission = require("../models/Admission");


const getAdmissions = async (req, res) => {

    const admission = await Admission.aggregate([

        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course"
            }
        }
    ]);
    res.status(200).json({
        success: true,
        count: admission.length,
        data: admission,
    });

}

const getAdmission = async (req, res) => {

    try {

        const admission = await Admission.aggregate([
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
            }
        ]);
        if (!admission.length > 0) {
            res.status(404).json({
                success: false,
                error: `Admission  record not found with the id of ${req.params.id}`
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

const createAdmission = async (req, res) => {

    try {
        const admission = await Admission.create(req.body);
        res.status(200).json({
            success: true,
            data: admission
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



module.exports = { getAdmissions, getAdmission, createAdmission, updateAdmission, deleteAdmission }