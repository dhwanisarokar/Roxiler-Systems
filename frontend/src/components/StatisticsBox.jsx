import React from 'react';

const StatisticsBox = ({ statistics }) => (
  <div className="grid grid-cols-3 gap-4 mt-4">
    <div className="p-4 bg-blue-200 text-center rounded">
      <h3>Total Sale Amount</h3>
      <p>${statistics.totalSaleAmount?.toFixed(2) || 0}</p>
    </div>
    <div className="p-4 bg-green-200 text-center rounded">
      <h3>Sold Items</h3>
      <p>{statistics.soldItems || 0}</p>
    </div>
    <div className="p-4 bg-red-200 text-center rounded">
      <h3>Unsold Items</h3>
      <p>{statistics.notSoldItems || 0}</p>
    </div>
  </div>
);

export default StatisticsBox;
