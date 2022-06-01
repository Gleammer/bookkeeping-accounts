const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const path = require("path");
const port = process.env.SERVER_PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
app.use(cors());
app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1.0/accounts", require("./routes/accountRoutes"));
app.use("/api/v1.0/rules", require("./routes/ruleRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) =>
        res.send({ message: "Basic express dev environment." })
    );
}

app.listen(port, () => console.log(`Server started on port ${port}`));
