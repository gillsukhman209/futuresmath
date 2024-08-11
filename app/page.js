"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";

export default function Home() {
  const [biggestProfitDay, setBiggestProfitDay] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [consistencyMessage, setConsistencyMessage] = useState("");
  const calculateConsistencyRule = () => {
    if (biggestProfitDay > accountBalance * 0.4) {
      const requiredBalance = biggestProfitDay / 0.4;
      setConsistencyMessage(
        `❌ You don't meet the consistency rule. Your account balance needs to be at least $${requiredBalance.toFixed(
          2
        )} to meet the rule.`
      );
    } else if (biggestProfitDay > 0) {
      setConsistencyMessage("✅ You meet the consistency rule");
    } else {
      setConsistencyMessage("✅ You meet the consistency rule");
    }
  };

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white flex flex-col items-center justify-center p-8 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl max-w-md w-full border border-white border-opacity-20 dark:border-gray-700"
        >
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600">
            Consistency Calculator
          </h1>
          <div className="space-y-8">
            <div>
              <label
                htmlFor="accountBalance"
                className="block text-sm font-medium mb-2 text-pink-200 dark:text-blue-200"
              >
                Account Balance
              </label>
              <input
                id="accountBalance"
                type="number"
                onChange={(e) => setAccountBalance(Number(e.target.value))}
                placeholder="Enter amount"
                className="w-full p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="biggestProfitDay"
                className="block text-sm font-medium mb-2 text-pink-200 dark:text-blue-200"
              >
                Biggest Profit Day
              </label>
              <input
                id="biggestProfitDay"
                type="number"
                onChange={(e) => setBiggestProfitDay(Number(e.target.value))}
                placeholder="Enter amount"
                className="w-full p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255,255,255,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={calculateConsistencyRule}
              className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-500 dark:via-indigo-600 dark:to-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Calculate Consistency
            </motion.button>
          </div>
          {consistencyMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-lg font-semibold text-center bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 p-6 rounded-xl border border-white border-opacity-20 dark:border-gray-600 shadow-inner"
            >
              {consistencyMessage}
            </motion.p>
          )}
        </motion.div>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
