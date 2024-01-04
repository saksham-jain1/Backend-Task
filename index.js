const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");


const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(express.json());

const loanRoutes = require("./routes/loanRouter");
const userRoutes = require("./routes/userRouter");

app.use("/api/loan", loanRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log("Connected Successfully");
});

module.exports = app;
