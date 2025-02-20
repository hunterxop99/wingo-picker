import React, { useState, useEffect } from "react";

const App = () => {
  const [result, setResult] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timer, setTimer] = useState(60);
  const [lastResultTime, setLastResultTime] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isLocked) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsLocked(false);
            return calculateRemainingSeconds();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked]);

  const calculateRemainingSeconds = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    return 60 - seconds;
  };

  const handleShowResults = () => {
    if (isLocked) return;

    const newResult = Math.random() < 0.5 ? "Small" : "Big";
    setResult(newResult);
    setIsLocked(true);
    setLastResultTime(new Date().toLocaleTimeString());
    setTimer(calculateRemainingSeconds());
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
      <nav className="w-full flex justify-between items-center p-3 bg-gray-900 shadow-md">
        <span className="text-yellow-400 text-lg font-bold">WinGo Picker</span>
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-yellow-400 text-lg">☰</button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 text-yellow-400">Home</a>
              <a href="https://t.me/DarkSharkOrg" className="block px-4 py-2 text-yellow-400">Dev</a>
            </div>
          )}
        </div>
      </nav>

      <button
        onClick={handleShowResults}
        disabled={isLocked}
        className={`px-6 py-3 mt-10 text-lg font-bold rounded-lg ${isLocked ? "bg-gray-500" : "bg-yellow-400"}`}
      >
        Show Results
      </button>

      {result && (
        <div className="mt-5 text-xl">
          <p>Result: {result}</p>
          <p className="text-gray-400">Last Result Time: {lastResultTime}</p>
        </div>
      )}

      {isLocked && <p className="mt-3 text-gray-400">Wait: {timer}s</p>}

      <footer className="mt-auto py-4 text-center text-gray-400">
        Developer: <a href="https://t.me/DarkSharkOrg" className="text-yellow-400">@DarkSharkOrg</a>
      </footer>
    </div>
  );
};

export default App;
