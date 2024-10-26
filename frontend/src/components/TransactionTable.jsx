import React, { useState } from "react";

const TransactionTable = ({ transactions, fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  console.log(transactions);
  
  const handleSearch = async () => {
    await fetchTransactions(search, page);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

      <table className="min-w-full mt-4 bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="py-2 px-4 border-b">{transaction.id}</td>
              <td className="py-2 px-4 border-b">{transaction.title}</td>
              <td className="py-2 px-4 border-b">{transaction.description}</td>
              <td className="py-2 px-4 border-b">
                ${transaction.price.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{transaction.category}</td>
              <td className="py-2 px-4 border-b">{transaction.sold ? "True": "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
