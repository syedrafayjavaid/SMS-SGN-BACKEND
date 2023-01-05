const Course = require("../models/Course");


const getCourses = async (req, res) => {

    const courses = await Course.find();
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });

}

const getCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({
                success: false,
                error: `Course not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: course,
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

const createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body);
        res.status(200).json({
            success: true,
            data: course
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

const updateCourse = async (req, res) => {

    const data = req.body;
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!course) {
            res.status(404).json({
                success: false,
                error: `Course not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: course,
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

const deleteCourse = async (req, res) => {

    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        res.status(404).json({
            success: false,
            error: `Course not found with the id of ${req.params.id}`
        })
    }
    else {
        res.status(200).json({
            success: true,
            msg: `Course deleted with the id ${req.params.id}`,
        });
    }


}


module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse }