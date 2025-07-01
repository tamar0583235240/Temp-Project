import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const typingText = "AI מנתח את התשובה שלך...";

export default function MagicLoader() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(typingText.slice(0, index + 1));
      index++;
      if (index >= typingText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] p-4">
      <motion.div
        className="relative w-24 h-24"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 360, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
          AI
        </div>
      </motion.div>
      <div className="mt-6 text-lg font-semibold text-text-main animate-pulse">
        {displayedText}
      </div>
    </div>
  );
}
