import { motion } from 'motion/react';
import { getSeverityColor } from '../utils/helpers';

interface SymptomCardProps {
  symptom: {
    id: number;
    name: string;
    icon: string;
    severity: string;
  };
  onClick: () => void;
}

export default function SymptomCard({ symptom, onClick }: SymptomCardProps) {
  const colors = getSeverityColor(symptom.severity);

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border ${colors.border} border-opacity-30 hover:border-opacity-100 transition-all overflow-hidden group`}
    >
      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="text-4xl">{symptom.icon}</span>
        <h3 className="text-white font-semibold">{symptom.name}</h3>
        <div className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-medium capitalize`}>
          {symptom.severity}
        </div>
      </div>
    </motion.button>
  );
}
