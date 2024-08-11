"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [biggestProfitDay, setBiggestProfitDay] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [consistencyMessage, setConsistencyMessage] = useState("");

  const calculateConsistencyRule = () => {
    if (biggestProfitDay > accountBalance * 0.4) {
      const requiredBalance = biggestProfitDay / 0.4;
      setConsistencyMessage(
        `You don't meet the consistency rule. Your account balance needs to be at least $${requiredBalance.toFixed(
          2
        )} to meet the rule.`
      );
    } else if (biggestProfitDay > 0) {
      setConsistencyMessage("You meet the consistency rule");
    } else {
      setConsistencyMessage("You meet the consistency rule");
    }
  };

  return (
    <div className="min-h-screen w-full text-black flex flex-col items-center gap-20">
      <div className="flex flex-col items-center gap-20 mt-20">
        <input
          type="number"
          onChange={(e) => setBiggestProfitDay(Number(e.target.value))}
          placeholder="Biggest Profit Day"
          className="p-2 border rounded"
        />

        <input
          type="number"
          onChange={(e) => setAccountBalance(Number(e.target.value))}
          placeholder="Account Balance"
          className="p-2 border rounded"
        />

        <button
          onClick={calculateConsistencyRule}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculate consistency
        </button>

        {consistencyMessage && (
          <p className="mt-4 text-lg font-semibold">{consistencyMessage}</p>
        )}
      </div>
      <Toaster />
    </div>
  );
}
