const asyncHandler = require("express-async-handler");

const Rule = require("../models/ruleModel");

//  @desc   Get list of Rules
//  @route  GET /api/v1.0/rules
const getRules = asyncHandler(async (req, res) => {
    const rules = await Rule.find(req.query)
        .populate("debitCode", "code name")
        .populate("creditCode", "code name");

    res.status(200).json(rules);
});

//  @desc   Get Rule by id
//  @route  GET /api/v1.0/rules/:id
const getRuleById = asyncHandler(async (req, res) => {
    const rule = await Rule.findById(req.params.id)
        .populate("debitCode", "code name")
        .populate("creditCode", "code name");

    if (!rule) {
        res.status(404);
        throw new Error("Nu Rule with such id found!");
    }

    res.status(200).json(rule);
});

//  @desc   Create Rule
//  @route  POST /api/v1.0/rules
const createRule = asyncHandler(async (req, res) => {
    const { debitCode, creditCode, condition } = req.body;

    if (!debitCode || !creditCode || !condition) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const rule = await Rule.create({
        debitCode: req.body.debitCode,
        creditCode: req.body.creditCode,
        condition: req.body.condition,
    });

    res.status(201).json(rule);
});

//  @desc   Update Rule
//  @route  PUT /api/v1.0/rules/:id
const updateRule = asyncHandler(async (req, res) => {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
        res.status(404);
        throw new Error("Rule not found!");
    }

    const updatedRule = await Rule.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedRule);
});

//  @desc   Delete Rule
//  @route  DELETE /api/v1.0/rules/:id
const deleteRule = asyncHandler(async (req, res) => {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
        res.status(404);
        throw new Error("Rule not found!");
    }

    await rule.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getRules,
    createRule,
    updateRule,
    deleteRule,
};
