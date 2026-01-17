
import React, { useState } from 'react';

interface ShoppingListProps {
  shoppingList: string[];
  setShoppingList: React.Dispatch<React.SetStateAction<string[]>>;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList, setShoppingList }) => {
  const [newItem, setNewItem] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem) return;
    setShoppingList([...shoppingList, newItem]);
    setNewItem('');
  };

  const removeItem = (idx: number) => {
    setShoppingList(shoppingList.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Einkaufsliste</h1>
        <p className="text-slate-500 dark:text-slate-400">Damit beim Kochen nichts fehlt.</p>
      </header>

      <form onSubmit={addItem} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Artikel hinzufügen..." 
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 text-white font-bold px-8 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
          +
        </button>
      </form>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {shoppingList.length > 0 ? (
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {shoppingList.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center p-5 group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <span className="text-lg font-medium">{item}</span>
                <button 
                  onClick={() => removeItem(idx)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-red-500 transition-all"
                >
                  ✓
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center text-slate-400">
            <span className="text-6xl block mb-4">🛒</span>
            <p>Deine Liste ist leer. Zeit zu planen!</p>
          </div>
        )}
      </div>

      {shoppingList.length > 0 && (
        <button 
            onClick={() => setShoppingList([])}
            className="w-full py-4 text-slate-400 hover:text-red-500 font-bold transition-all"
        >
            Alle als erledigt markieren
        </button>
      )}
    </div>
  );
};

export default ShoppingList;
