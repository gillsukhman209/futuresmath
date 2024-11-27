"use client";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";

export default function Home() {
  const [accountBalance, setAccountBalance] = useState(0);
  const [biggestProfitDay, setBiggestProfitDay] = useState(0);
  const [consistencyPercentage, setConsistencyPercentage] = useState(40);
  const [consistencyMessage, setConsistencyMessage] = useState("");
  const [maxDrawDown, setMaxDrawDown] = useState(0);
  const [riskPerTrade, setRiskPerTrade] = useState(0);
  const [maxTradesPerDay, setMaxTradesPerDay] = useState(0);
  const [accountLifeMessage, setAccountLifeMessage] = useState("");
  const [product, setProduct] = useState("");
  const [stopLoss, setStopLoss] = useState(0);
  const [tradeSizeResult, setTradeSizeResult] = useState("");
  const [bannerPosition, setBannerPosition] = useState(100);

  useEffect(() => {
    const animateBanner = () => {
      setBannerPosition((prevPosition) =>
        prevPosition <= -100 ? 100 : prevPosition - 0.1
      );
    };
    const intervalId = setInterval(animateBanner, 50);
    return () => clearInterval(intervalId);
  }, []);

  const calculateConsistencyRule = () => {
    if (biggestProfitDay > accountBalance * (consistencyPercentage / 100)) {
      const requiredBalance = biggestProfitDay / (consistencyPercentage / 100);
      setConsistencyMessage(
        `❌ You don't meet the consistency rule. Your account balance needs to be at least $${requiredBalance.toFixed(
          2
        )} to meet the consistency rule.`
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
        ` Your biggest day can't be greater than $${(
          accountBalance *
          (consistencyPercentage / 100)
        ).toFixed(2)}`
      );
    }
  };

  const calculateTradeSize = () => {
    if (!product || riskPerTrade <= 0 || stopLoss <= 0) {
      setTradeSizeResult("Please enter valid values for all fields.");
      return;
    }

    let contractSize, tickValue;
    switch (product.toLowerCase()) {
      case "es":
        contractSize = 50;
        tickValue = 12.5;
        break;
      case "nq":
        contractSize = 20;
        tickValue = 5;
        break;
      case "rty":
        contractSize = 50;
        tickValue = 5;
        break;
      case "mes":
        contractSize = 5;
        tickValue = 1.25;
        break;
      case "mnq":
        contractSize = 2;
        tickValue = 0.5;
        break;
      default:
        setTradeSizeResult("Invalid product. Please select a valid product.");
        return;
    }

    const riskInDollars = points;
    const stopLossInTicks = stopLoss * (contractSize / tickValue);
    const contractsToTrade = Math.floor(
      riskInDollars / (stopLossInTicks * tickValue)
    );

    setTradeSizeResult(
      `For ${product.toUpperCase()}, you can trade ${contractsToTrade} contract(s) with a stop loss of ${stopLoss} points to risk ${riskPerTrade}% of your account.`
    );
  };

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen  w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-300">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400 dark:from-blue-300 dark:via-indigo-400 dark:to-purple-500 animate-pulse">
          Futures Math
        </h1>
        <div className="flex justify-center  md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-6xl bg">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-2xl w-full md:w-1/3 border border-white border-opacity-20 dark:border-gray-700"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600">
              Consistency Calculator
            </h2>
            <div className="space-y-6 md:space-y-8">
              <div>
                <label
                  htmlFor="accountBalance"
                  className="block text-sm font-medium mb-2 text-pink-200 dark:text-blue-200"
                >
                  Profit in account
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
        </div>
        <Toaster />
        <div className="fixed bottom-0 left-0 w-full overflow-hidden bg-black bg-opacity-50 py-2">
          <div
            className="whitespace-nowrap text-white font-bold text-sm md:text-lg"
            style={{
              transform: `translateX(${bannerPosition}%)`,
              transition: "transform 1s linear",
            }}
          >
            🎉 Use my affiliate code "fearless" for a sweet 5% discount on any
            MFFU account. Or use this link{" "}
            <a
              href="https://myfundedfutures.com/?ref=1924&campaign=FuturesMath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              https://myfundedfutures.com/?ref=1924&campaign=FuturesMath
            </a>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
