const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction, getSummary } = require('../controllers/transactionController');

// Define API endpoints
router.post('/transactions', addTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/summary', getSummary);

module.exports = router;