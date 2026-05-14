import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { healthTips } from '../data/healthData';

export default function HealthTips() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % healthTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + healthTips.length) % healthTips.length);
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md border border-yellow-500/20">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Daily Health Tips</h3>
      </div>

      <div className="relative min-h-[120px] flex items-center">
        <button
          onClick={prevTip}
          className="absolute left-0 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-white text-lg leading-relaxed">{healthTips[currentTip]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={nextTip}
          className="absolute right-0 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {healthTips.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTip(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentTip
                ? 'bg-yellow-400 w-8'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
