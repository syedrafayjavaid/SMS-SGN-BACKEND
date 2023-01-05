const express = require("express");
const router = express.Router();

const {
    getParents,
    getParent,
    createParent,
    updateParent,
    deleteParent,
    loginParent

} = require("../controllers/parent");

router.route("/").get(getParents).post(createParent);
router.route("/:id").get(getParent).delete(deleteParent).put(updateParent);
router.route('/login').post(loginParent);

module.exports = router;
