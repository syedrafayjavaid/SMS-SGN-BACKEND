const express = require("express");
const router = express.Router();

const {
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,

} = require("../controllers/course");

router.route("/").get(getCourses).post(createCourse);
router
    .route("/:id")
    .get(getCourse)
    .delete(deleteCourse)
    .put(updateCourse);

module.exports = router;
