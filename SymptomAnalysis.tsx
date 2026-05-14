import { motion } from 'motion/react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { getSeverityColor } from '../utils/helpers';

interface SymptomAnalysisProps {
  symptom: string;
  data: {
    severity: 'mild' | 'moderate' | 'high';
    precautions: string[];
    seekHelp: string;
  };
  onClose: () => void;
}

export default function SymptomAnalysis({ symptom, data, onClose }: SymptomAnalysisProps) {
  const colors = getSeverityColor(data.severity);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{symptom}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className={`p-4 rounded-2xl ${colors.bg} border ${colors.border} mb-6`}>
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className={`w-6 h-6 ${colors.text}`} />
              <span className={`text-lg font-bold ${colors.text} capitalize`}>
                {data.severity} Severity
              </span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: data.severity === 'mild' ? '33%' :
                         data.severity === 'moderate' ? '66%' : '100%'
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full ${
                  data.severity === 'mild' ? 'bg-green-500' :
                  data.severity === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Precautions</h3>
              <div className="space-y-2">
                {data.precautions.map((precaution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{precaution}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
              <h3 className="text-red-400 font-semibold mb-2">When to Seek Help</h3>
              <p className="text-white/70">{data.seekHelp}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
