import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  translations: any;
}

export default function Header({ language, onLanguageChange, translations }: HeaderProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ];

  return (
    <header className="relative">
      <div className="flex items-center justify-between p-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            {translations.appName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-blue-300/60 mt-1"
          >
            {translations.tagline}
          </motion.p>
        </div>

        <button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
        >
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-white/80">{language.toUpperCase()}</span>
        </button>
      </div>

      <AnimatePresence>
        {showLangMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-6 top-20 z-50 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setShowLangMenu(false);
                }}
                className={`w-full px-6 py-3 text-left hover:bg-white/10 transition-all ${
                  language === lang.code ? 'bg-blue-500/20 text-blue-400' : 'text-white/80'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
