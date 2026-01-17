
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  activeView: View;
  navigateTo: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, navigateTo }) => {
  const navItems: { view: View; label: string; icon: string }[] = [
    { view: 'dashboard', label: 'Home', icon: '🏠' },
    { view: 'inventory', label: 'Vorrat', icon: '📦' },
    { view: 'recipes', label: 'Rezepte', icon: '📚' },
    { view: 'shopping', label: 'Liste', icon: '🛒' },
    { view: 'settings', label: 'Profil', icon: '👤' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-2 py-3 flex justify-around items-center z-50 safe-area-bottom">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => navigateTo(item.view)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeView === item.view
              ? 'text-indigo-600 dark:text-indigo-400 scale-110'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
