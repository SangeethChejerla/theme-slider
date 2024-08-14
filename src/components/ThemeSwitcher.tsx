import { getHue, getStoredTheme, setHue, setTheme } from '@/lib/settings-utils';
import type { LIGHT_DARK_MODE } from '@/types/config';
import { Palette, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThemeCustomizer: React.FC = () => {
  const [hue, setHueState] = useState(() => getHue());
  const [theme, setThemeState] = useState<LIGHT_DARK_MODE>(() =>
    getStoredTheme()
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setHue(hue);
    document.documentElement.style.setProperty('--hue', hue.toString());
  }, [hue]);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHueState(Number(e.target.value));
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const resetHue = () => {
    setHueState(250); // Default hue
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-primary-100"
        aria-label="Open theme customizer"
      >
        <Palette className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-64">
          <h2 className="text-lg font-semibold mb-2 text-primary-800 dark:text-primary-200">
            Theme Color
          </h2>
          <div className="flex items-center mb-4">
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={handleHueChange}
              className="w-full accent-primary-500"
            />
            <button
              onClick={resetHue}
              className="ml-2 text-primary-600 dark:text-primary-400"
              aria-label="Reset hue"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-700 dark:text-neutral-300">
              Theme
            </span>
            <button
              onClick={toggleTheme}
              className={`px-3 py-1 rounded ${
                theme === 'dark'
                  ? 'bg-primary-700 text-primary-100'
                  : 'bg-primary-200 text-primary-800'
              }`}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeCustomizer;
