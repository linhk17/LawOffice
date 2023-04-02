const express = require("express");
const matter = require("../controllers/matter.controller")

const router = express.Router();

router.route("/")
    .get(matter.findAll)
    .post(matter.create);

router.route("/:id")
    .get(matter.findById)
    .put(matter.update)
    .delete(matter.delete);

module.exports = router;