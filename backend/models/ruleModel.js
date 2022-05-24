const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
    {
        debitCode: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please provide the Debit Account code"],
            ref: 'Account'
        },
        creditCode: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please provide the Credit Account code"],
            ref: 'Account'
        },
        condition: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Rule", ruleSchema);
