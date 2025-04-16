"use client";

import React, { useState } from "react";

const ProfitLossLogic = () => {
  const [sp, setSp] = useState("");
  const [cp, setCp] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculate = () => {
    const sellingPrice = parseFloat(sp);
    const costPrice = parseFloat(cp);
    if (isNaN(sellingPrice) || isNaN(costPrice)) {
      setError("Enter a value");
      setResult("");
      return;
    }
    setError("");
    const difference = sellingPrice - costPrice;

    if (difference > 0) {
      setResult(`Profit: ₹${difference.toFixed(2)}`);
    } else if (difference < 0) {
      setResult(`Loss: ₹${Math.abs(difference).toFixed(2)}`);
    } else {
      setResult("No Profit, No Loss.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="p-8 rounded shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Profit or Loss</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Selling Price </label>
          <input
            type="number"
            value={sp}
            onChange={(e) => setSp(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="Selling price"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Cost Price </label>
          <input
            type="number"
            value={cp}
            onChange={(e) => setCp(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="Cost price"
          />
        </div>
        {error && (
          <div className="pb-4 text-red-500 font-semibold">{error}</div>
        )}
        <button
          onClick={calculate}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-green-500 transition-all duration-300"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-4 text-center font-semibold text-lg text-custom-black">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitLossLogic;