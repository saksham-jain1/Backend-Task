const express = require('express');
const router = express.Router();
const loanController = require('../controllers/LoanController.js');

// Routes for handling Loan CRUD operations
router.get('/', loanController.getAllLoans);
router.post('/', loanController.createLoan);
router.get('/:id', loanController.getLoanById);
router.patch('/:id', loanController.updateLoan);
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
