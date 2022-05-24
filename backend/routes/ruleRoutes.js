const express = require("express");
const router = express.Router();
const {
    getRules,
    createRule,
    updateRule,
    deleteRule,
} = require("../controllers/ruleController");

router.route("/").get(getRules).post(createRule);
router.route("/:id").put(updateRule).delete(deleteRule)

module.exports = router;
