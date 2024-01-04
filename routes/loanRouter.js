const express = require("express");
const router = express.Router();
const {
  getAllLoans,
  createLoan,
  getLoanById,
  updateLoan,
} = require("../controllers/LoanController");

router.route("/:loanId").get(getLoanById);
router.route("/").get(getAllLoans).post(createLoan).patch(updateLoan);

module.exports = router;
