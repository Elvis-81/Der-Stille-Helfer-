
import React, { useState, useEffect, useCallback } from 'react';
import { View, InventoryItem, Recipe, UserPreferences, Category } from './types';
import { storageService } from './services/storageService';
import { INITIAL_PREFERENCES, MOCK_RECIPES, UI_ICONS } from './constants';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import RecipeList from './components/RecipeList';
import ShoppingList from './components/ShoppingList';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [prefs, setPrefs] = useState<Record<string, UserPreferences>>(INITIAL_PREFERENCES);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial Load
    const storedInv = storageService.getInventory();
    const storedRecipes = storageService.getRecipes();
    const storedPrefs = storageService.getPreferences();
    const storedShopping = storageService.getShoppingList();

    if (storedInv.length > 0) setInventory(storedInv);
    setRecipes(storedRecipes.length > 0 ? storedRecipes : MOCK_RECIPES);
    if (storedPrefs) setPrefs(storedPrefs);
    setShoppingList(storedShopping);

    // Dark Mode check
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    storageService.saveInventory(inventory);
  }, [inventory]);

  useEffect(() => {
    storageService.saveRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    storageService.savePreferences(prefs);
  }, [prefs]);

  useEffect(() => {
    storageService.saveShoppingList(shoppingList);
  }, [shoppingList]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigateTo = (view: View, data?: any) => {
    if (view === 'recipe-detail' && data) {
      setSelectedRecipe(data);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar activeView={currentView} navigateTo={navigateTo} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="flex-1 pb-24 md:pb-6 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {currentView === 'dashboard' && (
            <Dashboard 
              inventory={inventory} 
              navigateTo={navigateTo} 
              prefs={prefs.elvis} 
            />
          )}
          {currentView === 'inventory' && (
            <Inventory 
              inventory={inventory} 
              setInventory={setInventory} 
            />
          )}
          {currentView === 'recipes' && (
            <RecipeList 
              recipes={recipes} 
              inventory={inventory} 
              prefs={prefs.elvis} 
              navigateTo={navigateTo} 
            />
          )}
          {currentView === 'recipe-detail' && selectedRecipe && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <button 
                    onClick={() => setCurrentView('recipes')}
                    className="mb-4 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 flex items-center gap-1"
                >
                    ← Zurück zur Liste
                </button>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{selectedRecipe.title}</h1>
                            <p className="text-slate-500 dark:text-slate-400">{selectedRecipe.description}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            {UI_ICONS.adapted} Für dich angepasst
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-slate-700">Zutaten</h2>
                            <ul className="space-y-3">
                                {selectedRecipe.ingredients.map((ing, idx) => {
                                    const replacement = prefs.elvis.substitutions[ing.name] || prefs.elvis.substitutions[ing.originalName || ''];
                                    return (
                                        <li key={idx} className="flex justify-between items-center text-lg">
                                            <span className="flex items-center gap-2">
                                                {ing.amount} {ing.unit} {replacement ? replacement : ing.name}
                                                {replacement && (
                                                    <span className="text-sm text-slate-400 flex items-center gap-1 ml-2">
                                                        {UI_ICONS.replaced} <span className="line-through">{ing.name}</span>
                                                    </span>
                                                )}
                                                {prefs.elvis.safeFoods.includes(ing.name) && (
                                                    <span className="text-sm text-green-500">{UI_ICONS.info} OK für dich</span>
                                                )}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-slate-700">Zubereitung</h2>
                            <ol className="space-y-4 list-decimal list-inside text-lg">
                                {selectedRecipe.steps.map((step, idx) => (
                                    <li key={idx} className="pl-2 marker:text-indigo-500 marker:font-bold">{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
          )}
          {currentView === 'shopping' && (
            <ShoppingList 
              shoppingList={shoppingList} 
              setShoppingList={setShoppingList} 
            />
          )}
          {currentView === 'settings' && (
            <Settings 
              prefs={prefs} 
              setPrefs={setPrefs} 
            />
          )}
        </div>
      </main>

      <BottomNav activeView={currentView} navigateTo={navigateTo} />
    </div>
  );
};

export default App;
