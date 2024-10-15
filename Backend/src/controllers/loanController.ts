import { Request, Response } from "express";
import  { Loan } from "../models/loanModel";
import { Book } from "../models/bookModel";
import sequelize from "../config/db"; // Adjust the import according to your project structure
export const borrowBook = async (req: Request, res: Response) => {
  const { book_id, user_id, borrow_date, due_date, action } = req.body;
     
  // Input validation
  if (!book_id || !user_id || !borrow_date || !due_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    // Fetch the current available copies for the book
    const book = await Book.findOne({ where: { book_id }, transaction });
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    let newAvailableCopies;

    if (action === "borrow") {
      if (book.dataValues.available_copies <= 0) {
        return res
          .status(400)
          .json({ error: "No available copies to borrow." });
      }

      newAvailableCopies = book.dataValues.available_copies - 1; // Decrease by 1
    } else {
      return res.status(400).json({ error: "Invalid action specified." });
    }

    // Create the loan transaction
    const loanTransaction = await Loan.create(
      {
       
        book_id,
        user_id,
        borrow_date,
        due_date,
        status: action === "borrow" ? "borrowed" : "returned",
        fine_amount: 0.0, // Initial fine amount
      },
      { transaction }
    );

    // Update the available copies in the database
    await Book.update(
      { available_copies: newAvailableCopies },
      {
        where: { book_id },
        transaction,
      }
    );

    // Commit the transaction
    await transaction.commit();

    return res.status(201).json({
      message: "Transaction successful",
      loanTransaction,
      available_copies: newAvailableCopies,
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    return res
      .status(500)
      .json({ error: "Failed to borrow or return book", details: error });
  }
};
// Ensure there's only one returnBook function
export const returnBook = async (req: Request, res: Response) => {
  const { loan_id, book_id } = req.body;

  // Input validation
  if (!loan_id || !book_id) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
      console.log("Received Request Body:", req.body); // Log the request body

      // Fetch the loan transaction
      const loanTransaction = await Loan.findOne({
          where: { loan_id:loan_id, status: 'returned' },
          transaction,
      });

      if (!loanTransaction) {
          console.error(`No active loan found for loan_id: ${loan_id}`); // More specific logging
          return res.status(404).json({ error: "No active loan found." });
      }

      console.log("Loan Transaction Found:", loanTransaction); // Log the fetched loan transaction

      // Update the loan transaction to mark it as returned
      await Loan.update(
          { status: 'returned', return_date: new Date() },
          {
              where: { loan_id },
              transaction,
          }
      );

      // Update the available copies of the book
      const book = await Book.findOne({ where: { book_id }, transaction });
      if (!book) {
          return res.status(404).json({ error: "Book not found." });
      }

      const newAvailableCopies = book.available_copies + 1;

      await Book.update(
          { available_copies: newAvailableCopies },
          { where: { book_id }, transaction }
      );

      // Commit the transaction
      await transaction.commit();

      return res.status(200).json({
          message: "Book returned successfully",
          available_copies: newAvailableCopies,
      });
  } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      console.error("Error during book return:", error); // Log error details
      return res.status(500).json({ error: "Failed to return book", details: error });
  }
};




// Get all transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Loan.findAll();
    return res.status(200).json(transactions);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: error });
  }
};

// Get transactions for a specific user
export const getUserTransactions = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const transactions = await Loan.findAll({
      where: { user_id },
    });
    return res.status(200).json(transactions);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch user transactions", details: error });
  }
};

// Get a specific transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  const { transaction_id } = req.params;

  try {
    const transaction = await Loan.findByPk(transaction_id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch transaction", details: error });
  }
};

