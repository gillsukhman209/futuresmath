"use client";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";

export default function Home() {
  const [biggestProfitDay, setBiggestProfitDay] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [consistencyMessage, setConsistencyMessage] = useState("");
  const [bannerPosition, setBannerPosition] = useState(100);
  const [maxDrawDown, setMaxDrawDown] = useState(0);
  const [riskPerTrade, setRiskPerTrade] = useState(0);
  const [accountLifeMessage, setAccountLifeMessage] = useState("");
  const [consistencyPercentage, setConsistencyPercentage] = useState(40);

  useEffect(() => {
    const animateBanner = () => {
      setBannerPosition((prevPosition) =>
        prevPosition <= -100 ? 100 : prevPosition - 0.5
      );
    };
    const intervalId = setInterval(animateBanner, 20);
    return () => clearInterval(intervalId);
  }, []);

  const calculateConsistencyRule = () => {
    if (biggestProfitDay > accountBalance * (consistencyPercentage / 100)) {
      const requiredBalance = biggestProfitDay / (consistencyPercentage / 100);
      setConsistencyMessage(
        `❌ You don't meet the consistency rule. Your account balance needs to be at least $${requiredBalance.toFixed(
          2
        )} to meet the rule.`
      );
    } else if (biggestProfitDay > 0) {
      setConsistencyMessage(
        `✅ You meet the consistency rule. Your biggest day can't be greater than $${(
          accountBalance *
          (consistencyPercentage / 100)
        ).toFixed(2)}`
      );
    } else {
      setConsistencyMessage(
        `✅ You meet the consistency rule. Your biggest day can't be greater than $${(
          accountBalance *
          (consistencyPercentage / 100)
        ).toFixed(2)}`
      );
    }
  };

  const calculateAccountLife = (maxDrawDown, riskPerTrade) => {
    if (riskPerTrade === 0) {
      return "Cannot calculate account life. Risk per trade cannot be zero.";
    }
    const accountLife = maxDrawDown / riskPerTrade;
    return `Your account can withstand approximately ${accountLife.toFixed(
      2
    )} losing trades before reaching the maximum drawdown.`;
  };

  const handleCalculateAccountLife = () => {
    const message = calculateAccountLife(maxDrawDown, riskPerTrade);
    setAccountLifeMessage(message);
  };

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-2xl w-full md:w-1/2 border border-white border-opacity-20 dark:border-gray-700"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600">
              Consistency Calculator
            </h1>
            <div className="space-y-6 md:space-y-8">
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
                  className="w-full p-3 md:p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
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
                  className="w-full p-3 md:p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="consistencyPercentage"
                  className="block text-sm font-medium mb-2 text-pink-200 dark:text-blue-200"
                >
                  Consistency Percentage (10-100%)
                </label>
                <input
                  id="consistencyPercentage"
                  type="number"
                  min="10"
                  max="100"
                  value={consistencyPercentage}
                  onChange={(e) =>
                    setConsistencyPercentage(Number(e.target.value))
                  }
                  className="w-full p-3 md:p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
                />
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255,255,255,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={calculateConsistencyRule}
                className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-500 dark:via-indigo-600 dark:to-purple-700 text-white font-bold py-3 md:py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Calculate Consistency
              </motion.button>
            </div>
            {consistencyMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 md:mt-8 text-base md:text-lg font-semibold text-center bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 p-4 md:p-6 rounded-xl border border-white border-opacity-20 dark:border-gray-600 shadow-inner"
              >
                {consistencyMessage}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-2xl w-full md:w-1/2 border border-white border-opacity-20 dark:border-gray-700"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600">
              Account Life Calculator
            </h1>
            <div className="space-y-6 md:space-y-8">
              <div>
                <label
                  htmlFor="maxDrawDown"
                  className="block text-sm font-medium mb-2 text-pink-200 dark:text-blue-200"
                >
                  Maximum Drawdown
                </label>
                <input
                  id="maxDrawDown"
                  type="number"
                  onChange={(e) => setMaxDrawDown(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="w-full p-3 md:p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="riskPerTrade"
                  className="block text-sm font-medium mb-2 text-pink-200 dark:text-blue-200"
                >
                  Risk Per Trade
                </label>
                <input
                  id="riskPerTrade"
                  type="number"
                  onChange={(e) => setRiskPerTrade(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="w-full p-3 md:p-4 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-400 transition text-white placeholder-gray-300 dark:placeholder-gray-400"
                />
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255,255,255,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCalculateAccountLife}
                className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-500 dark:via-indigo-600 dark:to-purple-700 text-white font-bold py-3 md:py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Calculate Account Life
              </motion.button>
            </div>
            {accountLifeMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 md:mt-8 text-base md:text-lg font-semibold text-center bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 p-4 md:p-6 rounded-xl border border-white border-opacity-20 dark:border-gray-600 shadow-inner"
              >
                {accountLifeMessage}
              </motion.p>
            )}
          </motion.div>
        </div>

        <Toaster />

        <div className="fixed bottom-0 left-0 w-full overflow-hidden bg-black bg-opacity-50 py-2">
          <div
            className="whitespace-nowrap text-white font-bold text-sm md:text-lg"
            style={{
              transform: `translateX(${bannerPosition}%)`,
              transition: "transform 0.1s linear",
            }}
          >
            🎉 Use my affiliate code "fearless" for a sweet 5% discount on any
            MFFU account.
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
