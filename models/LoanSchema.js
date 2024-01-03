const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  schedule: {
    type: date,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  // Add more fields as needed for the repayment schedule
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
    default: 'pending',
  },
  repaymentType: [repaymentSchema], // Array of repayment schedules
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
