const express = require("express");
const router = express.Router();
const {
    getAccounts,
    createAccount,
} = require("../controllers/accountController");

router.route('/').get(getAccounts).post(createAccount)

module.exports = router