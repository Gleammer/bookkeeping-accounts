const asyncHandler = require("express-async-handler");

const Account = require("../models/accountModel");

//  @desc   Get list of Accounts
//  @route  GET /api/v1.0/accounts
const getAccounts = asyncHandler(async (req, res) => {
    const accounts = await Account.find();

    res.status(200).json(accounts);
});

//  @desc   Get Account by id
//  @route  GET /api/v1.0/accounts/:id
const getAccountById = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(404);
        throw new Error("No Account with such id found!");
    }

    res.status(200).json(account);
});

//  @desc   Create Account
//  @route  POST /api/v1.0/accounts
const createAccount = asyncHandler(async (req, res) => {
    if (!req.body.code || !req.body.name) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const account = await Account.create({
        code: req.body.code,
        name: req.body.name,
    });

    res.status(201).json(account);
});

module.exports = {
    getAccounts,
    getAccountById,
    createAccount,
};
