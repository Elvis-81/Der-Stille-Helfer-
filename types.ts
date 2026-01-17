
export enum Category {
  FRIDGE = 'Kühlschrank',
  FREEZER = 'Gefrierschrank',
  PANTRY = 'Vorratsschrank',
  SPICES = 'Gewürze'
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: Category;
  expiryDate?: string;
  addedDate: string;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  isSubstitution?: boolean;
  originalName?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number; // in minutes
  servings: number;
  culture: 'French' | 'German' | 'Austrian' | 'Italian' | 'Balkan' | 'International';
  source?: string;
  isCustom?: boolean;
}

export interface UserPreferences {
  name: string;
  dislikes: string[];
  substitutions: Record<string, string>; // original -> replacement
  safeFoods: string[]; // items that are okay despite being technically allergens
}

export type View = 'dashboard' | 'inventory' | 'recipes' | 'shopping' | 'settings' | 'recipe-detail';
