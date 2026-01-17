
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  navigateTo: (view: View) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, navigateTo, isDarkMode, setIsDarkMode }) => {
  const navItems: { view: View; label: string; icon: string }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { view: 'inventory', label: 'Inventar', icon: '📦' },
    { view: 'recipes', label: 'Rezepte', icon: '📚' },
    { view: 'shopping', label: 'Einkaufsliste', icon: '🛒' },
    { view: 'settings', label: 'Einstellungen', icon: '⚙️' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen sticky top-0 p-6">
      <div className="mb-10 flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
            🛡️
        </div>
        <h1 className="text-xl font-bold tracking-tight">Stiller Helfer</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => navigateTo(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              activeView === item.view
                ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t dark:border-slate-700">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
          {isDarkMode ? 'Heller Modus' : 'Dunkler Modus'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
