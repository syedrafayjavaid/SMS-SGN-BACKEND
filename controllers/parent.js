const { default: mongoose } = require("mongoose");
const Parent = require("../models/Parent");
const sendTokenResponse = require('../utilities/sendTokenResponse');



const getParents = async (req, res) => {

    const parent = await Parent.aggregate([

        {
            $lookup: {
                from: "students",
                localField: "_id",
                foreignField: "parentId",
                as: "student"
            }
        }

    ]);
    res.status(200).json({
        success: true,
        count: parent.length,
        data: parent,
    });

}

const getParent = async (req, res) => {

    try {

        const parent = await Parent.aggregate([

            {
                $match: { _id: mongoose.Types.ObjectId(req.param.id) }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "parentId",
                    as: "children"
                }
            }
        ]);
        if (!parent.length > 0) {
            res.status(404).json({
                success: false,
                error: `Parent record not found with the id of ${req.params.id}`
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

// Register a parent 
const createParent = async (req, res) => {

    try {
        const parent = await Parent.create(req.body);
        res.status(200).json({
            success: true,
            data: parent
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

// Login a parent
const loginParent = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
            })
        }
        const parent = await Parent.findOne({ email }).select("+password");
        if (!parent) {
            return res.status(401).json({
                success: false,
                error: `Parent not found with the email ${email}`,
            })
        }

        const isMatch = await parent.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: `Invalid credentials`,
            })
        }

        // JWT token
        sendTokenResponse(parent, 200, res);



    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })

    }

}

const updateParent = async (req, res) => {


    console.log("Yes the right one is getting called");

    const data = req.body;
    try {
        const parent = await Parent.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!parent) {
            res.status(404).json({
                success: false,
                error: `Parent record  not found with the id of ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: parent,
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

const deleteParent = async (req, res) => {

    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) {
        res.status(404).json({
            success: false,
            error: `Parent record not found with the id of ${req.params.id}`
        })
    }
    else {
        res.status(200).json({
            success: true,
            msg: `Parent record deleted with the id ${req.params.id}`,
        });
    }


}


module.exports = { getParents, getParent, loginParent, createParent, updateParent, deleteParent }