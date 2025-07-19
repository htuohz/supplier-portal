'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {t('language')}: {currentLanguage.name}
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <ul>
            {languages.map(lang => (
              <li key={lang.code}>
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    lang.code === currentLanguage.code ? 'bg-gray-50 font-medium' : ''
                  }`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
