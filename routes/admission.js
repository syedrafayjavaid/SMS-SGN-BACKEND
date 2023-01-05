const express = require("express");
const router = express.Router();

const {
    getAdmissions,
    getAdmission,
    createAdmission,
    updateAdmission,
    deleteAdmission,

} = require("../controllers/admission");

router.route("/").get(getAdmissions).post(createAdmission);
router
    .route("/:id")
    .get(getAdmission)
    .delete(deleteAdmission)
    .put(updateAdmission);

module.exports = router;
