const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        code: {
            type: Integer,
            required: [true, "Please provide a unique code"],
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Account", accountSchema);
