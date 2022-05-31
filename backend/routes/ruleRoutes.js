const express = require("express");
const router = express.Router();
const {
    getRules,
    getRuleById,
    createRule,
    updateRule,
    deleteRule,
} = require("../controllers/ruleController");

router.route("/").get(getRules).post(createRule);
router.route("/:id").get(getRuleById).put(updateRule).delete(deleteRule);

module.exports = router;
