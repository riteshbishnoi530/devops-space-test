"use client";

import React, { useState } from "react";

const TriangleLogic = () => {
  const [angle1, setAngle1] = useState("");
  const [angle2, setAngle2] = useState("");
  const [angle3, setAngle3] = useState("");
  const [result, setResult] = useState("");

  const checkTriangle = () => {
    const a1 = parseFloat(angle1);
    const a2 = parseFloat(angle2);
    const a3 = parseFloat(angle3);

    if (isNaN(a1) || isNaN(a2) || isNaN(a3)) {
      setResult("Please enter valid numbers for all angles.");
      return;
    }

    if (a1 <= 0 || a2 <= 0 || a3 <= 0) {
      setResult("All angles must be greater than 0.");
      return;
    }

    const sum = a1 + a2 + a3;
    if (sum === 180) {
      setResult("Valid triangle!");
    } else {
      setResult("Not valid triangle.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="p-6 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
        Triangle Validator
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Angle 1</label>
          <input
            type="number"
            value={angle1}
            onChange={(e) => setAngle1(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="First angle"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Angle 2</label>
          <input
            type="number"
            value={angle2}
            onChange={(e) => setAngle2(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Second angle"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Angle 3</label>
          <input
            type="number"
            value={angle3}
            onChange={(e) => setAngle3(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Third angle"
          />
        </div>

        <button
          onClick={checkTriangle}
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Check Triangle
        </button>

        {result && (
          <div className="mt-4 text-center font-semibold text-lg text-gray-800">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default TriangleLogic;