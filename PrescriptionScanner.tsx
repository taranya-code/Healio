import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { parsePrescription } from '../utils/helpers';

interface PrescriptionScannerProps {
  onAddToTimeline?: (title: string, description: string) => void;
}

export default function PrescriptionScanner({ onAddToTimeline }: PrescriptionScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setOriginalText('');
    setParsedText('');

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const extractedText = result.data.text;
      setOriginalText(extractedText);
      const parsed = parsePrescription(extractedText);
      setParsedText(parsed);

      if (onAddToTimeline) {
        onAddToTimeline(
          'Prescription Scanned',
          `Processed prescription - ${parsed.substring(0, 100)}...`
        );
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing prescription. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-500/20">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Prescription Scanner</h3>
      </div>

      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isProcessing}
        />
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-8 border-2 border-dashed border-blue-400/30 rounded-2xl cursor-pointer hover:border-blue-400 transition-all bg-white/5"
        >
          <div className="flex flex-col items-center gap-3">
            {isProcessing ? (
              <>
                <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                <p className="text-white/80">Processing... {progress}%</p>
                <div className="w-full max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-blue-400" />
                <p className="text-white/80 text-center">
                  Click to upload prescription image
                </p>
                <p className="text-white/40 text-sm">Supports JPG, PNG, PDF</p>
              </>
            )}
          </div>
        </motion.div>
      </label>

      {parsedText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-sm text-blue-400 font-semibold mb-2">Original Text</h4>
            <p className="text-white/60 text-sm whitespace-pre-wrap">{originalText}</p>
          </div>

          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <h4 className="text-sm text-green-400 font-semibold mb-2">Simplified Instructions</h4>
            <p className="text-white whitespace-pre-wrap">{parsedText}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
