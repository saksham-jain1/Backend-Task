const express = require('express');
const router = express.Router();
const Loan = require('../models/LoanSchema'); // Assuming your Loan model is in a 'models' directory

// Get all loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new loan
router.post('/', async (req, res) => {
  const loan = new Loan({
    amount: req.body.amount,
    term: req.body.term,
    loanStartDate: req.body.loanStartDate || Date.now(),
    status: req.body.status || 'pending',
    repaymentType: req.body.repaymentType || [],
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single loan by ID
router.get('/:id', getLoan, (req, res) => {
  res.json(res.loan);
});

// Update a loan
router.patch('/:id', getLoan, async (req, res) => {
  if (req.body.amount != null) {
    res.loan.amount = req.body.amount;
  }
  if (req.body.term != null) {
    res.loan.term = req.body.term;
  }
  if (req.body.status != null) {
    res.loan.status = req.body.status;
  }
  if (req.body.repaymentType != null) {
    res.loan.repaymentType = req.body.repaymentType;
  }

  try {
    const updatedLoan = await res.loan.save();
    res.json(updatedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a loan
router.delete('/:id', getLoan, async (req, res) => {
  try {
    await res.loan.remove();
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a loan by ID
async function getLoan(req, res, next) {
  let loan;
  try {
    loan = await Loan.findById(req.params.id);
    if (loan == null) {
      return res.status(404).json({ message: 'Loan not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.loan = loan;
  next();
}

module.exports = router;
