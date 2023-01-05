const express = require("express");
const router = express.Router();

const {
    getClasses,
    getClass,
    getSpecificClasses,
    getDailyClasses,
    createClass,
    updateClass,
    deleteClass,

} = require("../controllers/class");

router.route("/").get(getClasses).post(createClass);
router.route("/:id").get(getClass).delete(deleteClass).put(updateClass);
router.route("/specificClasses").post(getSpecificClasses)
router.route("/dailyClasses").post(getDailyClasses)


module.exports = router;
