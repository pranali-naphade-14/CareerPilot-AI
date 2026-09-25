const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://careerpilot-ai-1-7s2u.onrender.com",
    credentials: true
}));

app.use("/auth", authRouter);
app.use("/interview", interviewRouter);

module.exports = app;