import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  language: string;
}

export default function VoiceAssistant({ language }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const languageMap: Record<string, string> = {
    en: 'en-US',
    ta: 'ta-IN',
    hi: 'hi-IN',
    kn: 'kn-IN',
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = languageMap[language] || 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceCommand(text);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[language] || 'en-US';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('fever') || lowerCommand.includes('காய்ச்சல்')) {
      speak('For fever, rest and stay hydrated. Take paracetamol as directed.');
    } else if (lowerCommand.includes('headache') || lowerCommand.includes('தலைவலி')) {
      speak('For headache, rest in a quiet room and apply cold compress.');
    } else if (lowerCommand.includes('emergency') || lowerCommand.includes('அவசரம்')) {
      speak('Activating emergency mode. Stay calm, help is on the way.');
    } else {
      speak('I heard you. Please select a symptom for detailed guidance.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-4">Voice Assistant</h3>

      <div className="flex items-center gap-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startListening}
          disabled={isListening}
          className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            {isListening ? 'Listening...' : 'Start Voice Input'}
          </div>
        </motion.button>

        {isSpeaking && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopSpeaking}
            className="p-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white transition-all"
          >
            <VolumeX className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-sm text-white/60 mb-1">You said:</p>
          <p className="text-white">{transcript}</p>
        </motion.div>
      )}
    </div>
  );
}
