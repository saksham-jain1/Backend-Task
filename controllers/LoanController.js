const Loan = require("../models/LoanSchema");
const User = require("../models/UserSchema");

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createLoan = async (req, res) => {
  const repay = [];
  let startDate = new Date(Number(req.body.loanStartDate));

  for (let i = 0; i < req.body.loanTerm; i++) {
    startDate.setDate(startDate.getDate() + 7);
    repay.push({ schedule: startDate, status: "Unpaid" });
  }

  try {
    const loan = new Loan({
      amount: req.body.loanAmount,
      term: req.body.loanTerm,
      loanStartDate: req.body.loanStartDate,
      status: "pending",
      repayment: [...repay],
    });

    const newLoan = await loan.save();

    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { loans: newLoan._id } },
      { new: true }
    );

    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLoanById = async (req, res) => {
  const { loanId } = req.params;
  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateLoan = async (req, res) => {
  const { loanId, repaymentId, type } = req.body;

  try {
    let updatedEntity;

    if (type === "user") {
      updatedEntity = await Loan.findOneAndUpdate(
        {
          _id: loanId,
          "repayment._id": repaymentId,
        },
        {
          $set: {
            "repayment.$.status": "Paid",
          },
        },
        { new: true }
      );
    } else {
      updatedEntity = await Loan.findOneAndUpdate(
        { _id: loanId },
        { $set: { status: req.body.status } },
        { new: true }
      );
    }

    if (!updatedEntity) {
      return res.status(404).json({ message: "Loan or Repayment not found" });
    }

    res.status(200).json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllLoans,
  createLoan,
  getLoanById,
  updateLoan,
};
