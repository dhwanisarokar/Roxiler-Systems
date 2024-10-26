const axios = require("axios");
const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");
const { THIRD_PARTY_API_URL } = require("../config/config");

// Initialize the database by seeding data from the third-party API
const initializeDatabase = catchAsync(async (req, res) => {
  const { data } = await axios.get(THIRD_PARTY_API_URL);
  await Transaction.deleteMany();
  await Transaction.insertMany(data);
  res.status(200).json({ message: "Database initialized with seed data." });
});

const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11
};

const getTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
    const monthNumber = monthMap[month];

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber + 1] // +1 as MongoDB month starts at 1
      }
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json(transactions);
};

// Get statistics (total sale amount, total sold items, total not sold items)
const getStatistics = catchAsync(async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  const totalSale = await Transaction.aggregate([
    {
      $match: {
        dateOfSale: {
          $regex: `^\\d{4}-${monthNumber < 10 ? "0" : ""}${monthNumber}`,
        },
      },
    },
    { $group: { _id: null, total: { $sum: "$price" } } },
  ]);

  const soldItemsCount = await Transaction.countDocuments({ sold: true });
  const unsoldItemsCount = await Transaction.countDocuments({ sold: false });

  res.json({
    totalSaleAmount: totalSale[0]?.total || 0,
    soldItems: soldItemsCount,
    notSoldItems: unsoldItemsCount,
  });
});

// Get bar chart data for price ranges
const getPriceRangeData = catchAsync(async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  const priceRanges = await Transaction.aggregate([
    {
      $match: {
        dateOfSale: {
          $regex: `^\\d{4}-${monthNumber < 10 ? "0" : ""}${monthNumber}`,
        },
      },
    },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
        default: "901-above",
        output: { count: { $sum: 1 } },
      },
    },
  ]);

  res.json(priceRanges);
});

// 5. Get pie chart data for unique categories
const getCategoryDistribution = catchAsync(async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  const categoryData = await Transaction.aggregate([
    {
      $match: {
        dateOfSale: {
          $regex: `^\\d{4}-${monthNumber < 10 ? "0" : ""}${monthNumber}`,
        },
      },
    },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  res.json(categoryData);
});

// 6. Get combined data from the above APIs
const getCombinedData = catchAsync(async (req, res) => {
  const { month } = req.query;
  const statistics = this.getStatistics(req, res);
  const priceRangeData = this.getPriceRangeData(req, res);
  const categoryDistribution = this.getCategoryDistribution(req, res);

  res.json({
    statistics,
    priceRangeData,
    categoryDistribution,
  });
});

module.exports = {
  getPriceRangeData,
  getCombinedData,
  getCategoryDistribution,
  getStatistics,
  getTransactions,
  initializeDatabase,
};
