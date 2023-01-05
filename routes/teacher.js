const express = require("express");
const router = express.Router();

const {
    getTeachers,
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    loginTeacher

} = require("../controllers/teacher");

router.route("/").get(getTeachers).post(createTeacher);
router.route("/:id").get(getTeacher).delete(deleteTeacher).put(updateTeacher);
router.route("/login").post(loginTeacher)

module.exports = router;
