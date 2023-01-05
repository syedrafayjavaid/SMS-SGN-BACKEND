const express = require("express");
const router = express.Router();

const {
    getAttendances,
    createAttendance,
    getAttendance,
    getStudentAttendance

} = require("../controllers/studentAttendance");

router.route("/").get(getAttendances).post(createAttendance)
router.route("/student").post(getStudentAttendance);
router.route("/:id").get(getAttendance);


module.exports = router;
