
import React, { useState, useEffect } from 'react';
import { InventoryItem, UserPreferences, View } from '../types';
import { geminiService } from '../services/geminiService';
import { UI_ICONS } from '../constants';

interface DashboardProps {
  inventory: InventoryItem[];
  navigateTo: (view: View) => void;
  prefs: UserPreferences;
}

const Dashboard: React.FC<DashboardProps> = ({ inventory, navigateTo, prefs }) => {
  const [suggestion, setSuggestion] = useState<string>("Lade Vorschläge...");
  const [expiringItems, setExpiringItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const now = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    const expiring = inventory.filter(item => {
      if (!item.expiryDate) return false;
      const expiry = new Date(item.expiryDate);
      return expiry <= threeDaysFromNow;
    }).sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime());

    setExpiringItems(expiring);

    // Call Gemini for context-aware suggestion
    const fetchSuggestions = async () => {
      const text = await geminiService.suggestRecipes(inventory, prefs);
      setSuggestion(text);
    };
    fetchSuggestions();
  }, [inventory, prefs]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Willkommen, Elvis!</h1>
        <p className="text-slate-500 dark:text-slate-400">Hier ist dein aktueller Küchenstatus.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiry Alerts */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⏰</span>
            <h2 className="text-xl font-bold">Läuft bald ab</h2>
          </div>
          {expiringItems.length > 0 ? (
            <div className="space-y-3">
              {expiringItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <p className="text-xs text-red-600 dark:text-red-400">Läuft ab: {new Date(item.expiryDate!).toLocaleDateString('de-DE')}</p>
                  </div>
                  <span className="text-sm font-medium">{item.quantity} {item.unit}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic">Alles frisch im Kühlschrank!</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between cursor-pointer" onClick={() => navigateTo('inventory')}>
            <span className="text-4xl">📦</span>
            <div>
              <p className="text-indigo-100 text-sm font-medium">Inventar</p>
              <p className="text-2xl font-bold">{inventory.length} Artikel</p>
            </div>
          </div>
          <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between cursor-pointer" onClick={() => navigateTo('recipes')}>
            <span className="text-4xl">📚</span>
            <div>
              <p className="text-emerald-100 text-sm font-medium">Rezepte</p>
              <p className="text-2xl font-bold">Bereit!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gemini AI Advice */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🍳</span>
          <h2 className="text-xl font-bold">Der Planer-Bot schlägt vor:</h2>
        </div>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          {suggestion.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
        <button 
          onClick={() => navigateTo('recipes')}
          className="mt-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold py-2 px-6 rounded-full hover:bg-indigo-100 transition-all flex items-center gap-2"
        >
          Alle Rezepte ansehen {UI_ICONS.adapted}
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
