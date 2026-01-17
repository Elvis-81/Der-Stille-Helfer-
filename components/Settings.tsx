
import React from 'react';
import { UserPreferences } from '../types';

interface SettingsProps {
  prefs: Record<string, UserPreferences>;
  setPrefs: React.Dispatch<React.SetStateAction<Record<string, UserPreferences>>>;
}

const Settings: React.FC<SettingsProps> = ({ prefs, setPrefs }) => {
  const elvis = prefs.elvis;

  const updateSub = (original: string, replacement: string) => {
    setPrefs({
      ...prefs,
      elvis: {
        ...elvis,
        substitutions: {
          ...elvis.substitutions,
          [original]: replacement
        }
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>
        <p className="text-slate-500 dark:text-slate-400">Deine persönlichen Vorlieben und Ersetzungen.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">👤 Profil: {elvis.name}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mag ich nicht / Allergien (Diskret)</label>
              <div className="flex flex-wrap gap-2">
                {elvis.dislikes.map(d => (
                  <span key={d} className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg text-sm font-bold">
                    {d}
                  </span>
                ))}
                <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 px-3 py-1 rounded-lg text-sm font-bold">+</button>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Ausnahmen (Sichere Lebensmittel)</label>
              <div className="flex flex-wrap gap-2">
                {elvis.safeFoods.map(s => (
                  <span key={s} className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg text-sm font-bold">
                    {s}
                  </span>
                ))}
                <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 px-3 py-1 rounded-lg text-sm font-bold">+</button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🔄 Intelligente Ersetzungen</h2>
          <div className="space-y-3">
            {Object.entries(elvis.substitutions).map(([orig, repl]) => (
              <div key={orig} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <span className="text-slate-500 font-medium">{orig}</span>
                <span className="text-slate-300">→</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{repl}</span>
              </div>
            ))}
            <div className="pt-2">
                 <button className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 font-bold hover:border-indigo-400 hover:text-indigo-500 transition-all">
                    Neue Ersetzung hinzufügen
                 </button>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4">Datensicherung</h2>
        <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-all">
                📥 Daten Exportieren (JSON)
            </button>
            <button className="flex-1 bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-all">
                📤 Daten Importieren
            </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
