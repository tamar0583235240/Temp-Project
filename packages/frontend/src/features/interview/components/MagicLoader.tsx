import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const typingText = "AI מנתח את תשובתך...";

export default function MagicLoader() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(typingText.slice(0, index + 1));
      index++;
      if (index >= typingText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <motion.div
        className="relative w-28 h-28"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-400 blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
          AI
        </div>
      </motion.div>
      <div className="mt-6 text-xl font-medium text-gray-700 animate-pulse">
        {displayedText}
      </div>
    </div>
  );
}
