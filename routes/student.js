const express = require("express");
const router = express.Router();

const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    loginStudent
} = require("../controllers/student");

router.route("/").get(getStudents).post(createStudent);
router.route("/:id").get(getStudent).delete(deleteStudent).put(updateStudent);
router.route("/login").post(loginStudent);

module.exports = router;
