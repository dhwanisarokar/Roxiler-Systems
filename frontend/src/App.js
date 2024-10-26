import React, { useState, useEffect } from 'react';
import {
  fetchTransactions,
  fetchStatistics,
  fetchPriceRangeData,
  fetchCategoryDistribution,
} from './services/api';
import TransactionTable from './components/TransactionTable';
import StatisticsBox from './components/StatisticsBox';
import BarChartComponent from './components/BarChart';
import PieChartComponent from './components/PieChart';

const App = () => {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);

  useEffect(() => {
    fetchAllData(month);
  }, [month]);

  const fetchAllData = async (month) => {
    const transactionsRes = await fetchTransactions(month);
    const statisticsRes = await fetchStatistics(month);
    const priceRangeRes = await fetchPriceRangeData(month);
    const categoryRes = await fetchCategoryDistribution(month);

    setTransactions(transactionsRes.data);
    setStatistics(statisticsRes.data);
    setPriceRangeData(priceRangeRes.data);
    setCategoryDistribution(categoryRes.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>

      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((m) => (
          <option key={m} value= {new Date(0, m - 1).toLocaleString("default", { month: "long" })}>
            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      </div>

      <StatisticsBox statistics={statistics} />
      <TransactionTable transactions={transactions} fetchTransactions={fetchTransactions} />
      <BarChartComponent data={priceRangeData} />
      <PieChartComponent data={categoryDistribution} />
    </div>
  );
};

export default App;
