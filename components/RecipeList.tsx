
import React, { useState } from 'react';
import { Recipe, InventoryItem, UserPreferences, View } from '../types';
import { UI_ICONS } from '../constants';

interface RecipeListProps {
  recipes: Recipe[];
  inventory: InventoryItem[];
  prefs: UserPreferences;
  navigateTo: (view: View, data?: any) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, inventory, prefs, navigateTo }) => {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'All' | 'Cookable'>('All');

  const isRecipeCookable = (recipe: Recipe): boolean => {
    // Basic logic: at least 70% of ingredients must be in inventory
    const totalIngredients = recipe.ingredients.length;
    let availableCount = 0;

    recipe.ingredients.forEach(ing => {
      const found = inventory.find(inv => inv.name.toLowerCase().includes(ing.name.toLowerCase()));
      if (found) availableCount++;
    });

    return (availableCount / totalIngredients) >= 0.7;
  };

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                          r.culture.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterMode === 'All' ? true : isRecipeCookable(r);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rezept-Bibliothek</h1>
          <p className="text-slate-500 dark:text-slate-400">5200+ Klassiker für deine Küche.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
          <button 
            onClick={() => setFilterMode('All')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filterMode === 'All' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Alle
          </button>
          <button 
            onClick={() => setFilterMode('Cookable')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filterMode === 'Cookable' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Möglich {UI_ICONS.adapted}
          </button>
        </div>
      </header>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40">🔍</span>
        <input 
          type="text" 
          placeholder="Rezept oder Küche suchen..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl pl-12 pr-6 py-4 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 dark:text-white transition-all outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id}
            onClick={() => navigateTo('recipe-detail', recipe)}
            className="group bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="h-40 bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                {recipe.culture === 'Italian' && '🍝'}
                {recipe.culture === 'Austrian' && '🇦🇹'}
                {recipe.culture === 'German' && '🍲'}
                {recipe.culture === 'French' && '🇫🇷'}
                {recipe.culture === 'Balkan' && '🥣'}
                {recipe.culture === 'International' && '🌍'}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold leading-tight group-hover:text-indigo-600 transition-colors">{recipe.title}</h3>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg uppercase text-slate-500">{recipe.culture}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{recipe.description}</p>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1">⏱️ {recipe.prepTime} Min</span>
                <span className="flex items-center gap-1">👥 {recipe.servings} Pers</span>
                <span className="text-green-500 flex items-center gap-1">{UI_ICONS.adapted} Diskret</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
