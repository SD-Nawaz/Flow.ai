const Transaction = require('../models/transaction');

// POST /transactions
exports.addTransaction = async (req, res) => {
    try {
        const { type, category, amount, date, description } = req.body;
        const transaction = new Transaction({ type, category, amount, date, description });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET /transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /transactions/:id
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /transactions/:id
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /transactions/:id
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /summary
exports.getSummary = async (req, res) => {
    try {
        const income = await Transaction.aggregate([{ $match: { type: 'income' } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
        const expenses = await Transaction.aggregate([{ $match: { type: 'expense' } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
        const balance = (income[0]?.total || 0) - (expenses[0]?.total || 0);
        res.status(200).json({ income: income[0]?.total || 0, expenses: expenses[0]?.total || 0, balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};