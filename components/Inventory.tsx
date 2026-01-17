
import React, { useState } from 'react';
import { Category, InventoryItem } from '../types';

interface InventoryProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, setInventory }) => {
  const [filter, setFilter] = useState<Category | 'Alle'>('Alle');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState('Stk');
  const [newItemCat, setNewItemCat] = useState<Category>(Category.FRIDGE);
  const [newItemExpiry, setNewItemExpiry] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: newItemQty,
      unit: newItemUnit,
      category: newItemCat,
      expiryDate: newItemExpiry || undefined,
      addedDate: new Date().toISOString()
    };

    setInventory([...inventory, newItem]);
    setNewItemName('');
    setNewItemQty(1);
    setNewItemExpiry('');
  };

  const removeItem = (id: string) => {
    setInventory(inventory.filter(i => i.id !== id));
  };

  const categories = Object.values(Category);
  const filteredInventory = filter === 'Alle' ? inventory : inventory.filter(i => i.category === filter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vorratsschrank</h1>
          <p className="text-slate-500 dark:text-slate-400">Was haben wir momentan da?</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setFilter('Alle')}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${filter === 'Alle' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}
          >
            Alle
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${filter === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Quick Add Form */}
      <form onSubmit={addItem} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="col-span-1 md:col-span-1">
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Produkt</label>
          <input 
            type="text" 
            placeholder="z.B. Milch" 
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>
        <div className="flex gap-2 col-span-1">
           <div className="flex-1">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Menge</label>
            <input 
                type="number" 
                value={newItemQty}
                onChange={e => setNewItemQty(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
          <div className="w-20">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Einh.</label>
            <input 
                type="text" 
                value={newItemUnit}
                onChange={e => setNewItemUnit(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Kategorie</label>
          <select 
            value={newItemCat}
            onChange={e => setNewItemCat(e.target.value as Category)}
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:text-white"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
          Hinzufügen
        </button>
      </form>

      {/* Inventory List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInventory.map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center group">
            <div>
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-xs text-slate-400">{item.category}</p>
              {item.expiryDate && (
                <p className={`text-xs mt-1 font-medium ${new Date(item.expiryDate) < new Date() ? 'text-red-500' : 'text-orange-500'}`}>
                   ⌛ {new Date(item.expiryDate).toLocaleDateString('de-DE')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-xl font-bold text-indigo-600 dark:text-indigo-300">
                {item.quantity} {item.unit}
              </span>
              <button 
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-500"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
