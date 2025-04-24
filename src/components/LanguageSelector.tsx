import React from 'react';
import { Globe } from 'lucide-react';

export interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "bg", name: "Bulgarian" },
  { code: "zh", name: "Chinese Simplified" },
  { code: "zh_tw", name: "Chinese Traditional" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "hi", name: "Hindi" },
  { code: "hu", name: "Hungarian" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jv", name: "Javanese" },
  { code: "ko", name: "Korean" },
  { code: "zh_cmn", name: "Mandarin" },
  { code: "mr", name: "Marathi" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sr", name: "Serbian" },
  { code: "si", name: "Sinhalese" },
  { code: "sk", name: "Slovak" },
  { code: "es", name: "Spanish" },
  { code: "sv", name: "Swedish" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "vi", name: "Vietnamese" },
  { code: "zh_wuu", name: "Wu (Shanghainese)" },
  { code: "zh_hsn", name: "Xiang" },
  { code: "zh_yue", name: "Yue (Cantonese)" },
  { code: "zu", name: "Zulu" }
];

interface LanguageSelectorProps {
  selectedLang: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLang, onLanguageChange }) => {
  return (
    <div className="relative">
      <label 
        htmlFor="language-select" 
        className="block text-white text-lg font-semibold mb-2"
      >
        Select Language
      </label>
      
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        
        <select
          id="language-select"
          value={selectedLang}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full py-3 pl-10 pr-10 rounded-lg bg-white/30 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none transition-all"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="text-gray-800">
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;