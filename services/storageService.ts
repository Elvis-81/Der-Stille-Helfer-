
import { InventoryItem, Recipe, UserPreferences } from '../types';

const STORAGE_KEYS = {
  INVENTORY: 'sh_inventory',
  RECIPES: 'sh_recipes',
  PREFERENCES: 'sh_preferences',
  SHOPPING_LIST: 'sh_shopping_list'
};

export const storageService = {
  getInventory: (): InventoryItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return data ? JSON.parse(data) : [];
  },
  saveInventory: (items: InventoryItem[]) => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(items));
  },
  
  getRecipes: (): Recipe[] => {
    const data = localStorage.getItem(STORAGE_KEYS.RECIPES);
    return data ? JSON.parse(data) : [];
  },
  saveRecipes: (recipes: Recipe[]) => {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  },

  getPreferences: (): Record<string, UserPreferences> | null => {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? JSON.parse(data) : null;
  },
  savePreferences: (prefs: Record<string, UserPreferences>) => {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  },

  getShoppingList: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
    return data ? JSON.parse(data) : [];
  },
  saveShoppingList: (list: string[]) => {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(list));
  }
};
