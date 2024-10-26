const express = require('express');
const {
  getPriceRangeData,
  getCombinedData,
  getCategoryDistribution,
  getStatistics,
  initializeDatabase,
  getTransactions
} = require('../controllers/transaction.controller');
const router = express.Router();

router.get('/initializeDatabase', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/price-range', getPriceRangeData);
router.get('/category-distribution', getCategoryDistribution);
router.get('/combined', getCombinedData);

module.exports = router;
