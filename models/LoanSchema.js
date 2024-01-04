const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema({
  schedule: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Unpaid",
  },
});

const loanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  loanStartDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  repayment: [repaymentSchema],
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
