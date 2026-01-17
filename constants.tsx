
import React from 'react';
import { Category, Recipe, UserPreferences } from './types';

export const INITIAL_PREFERENCES: Record<string, UserPreferences> = {
  elvis: {
    name: 'Elvis',
    dislikes: ['Fischsauce', 'Pilze'],
    substitutions: {
      'Weizenmehl': 'Dinkelmehl',
      'Kuhmilch': 'Sauerrahm',
      'Sahne': 'Sauerrahm',
      'Parmesan': 'Hefeflocken'
    },
    safeFoods: ['Butter']
  },
  alberina: {
    name: 'Alberina',
    dislikes: ['Pilze'],
    substitutions: {},
    safeFoods: []
  }
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Der Klassiker aus Italien, diskret für Elvis angepasst.',
    prepTime: 25,
    servings: 2,
    culture: 'Italian',
    ingredients: [
      { name: 'Spaghetti', amount: 400, unit: 'g' },
      { name: 'Speck', amount: 200, unit: 'g' },
      { name: 'Eier', amount: 3, unit: 'Stk' },
      { name: 'Sahne', amount: 100, unit: 'ml', isSubstitution: true, originalName: 'Sahne' },
      { name: 'Parmesan', amount: 50, unit: 'g', isSubstitution: true, originalName: 'Parmesan' }
    ],
    steps: [
      'Nudeln in Salzwasser kochen.',
      'Speck in der Pfanne anbraten.',
      'Eier mit Sahne-Ersatz und Käse-Ersatz verquirlen.',
      'Nudeln zum Speck geben, Pfanne vom Herd nehmen.',
      'Eiermischung unterrühren, bis sie cremig wird.'
    ]
  },
  {
    id: '2',
    title: 'Kaiserschmarren',
    description: 'Österreichische Süßspeise, perfekt als Frühstück oder Dessert.',
    prepTime: 20,
    servings: 2,
    culture: 'Austrian',
    ingredients: [
      { name: 'Dinkelmehl', amount: 250, unit: 'g' },
      { name: 'Milch', amount: 500, unit: 'ml' },
      { name: 'Eier', amount: 4, unit: 'Stk' },
      { name: 'Zucker', amount: 2, unit: 'EL' },
      { name: 'Butter', amount: 30, unit: 'g' }
    ],
    steps: [
      'Eier trennen.',
      'Eigelb, Mehl, Milch und Zucker zu einem glatten Teig rühren.',
      'Eiweiß steif schlagen und unterheben.',
      'In Butter goldbraun backen und zerreißen.'
    ]
  },
  {
    id: '3',
    title: 'Sauerbraten',
    description: 'Traditionelles deutsches Gericht nach Henriette Davidis.',
    prepTime: 120,
    servings: 4,
    culture: 'German',
    ingredients: [
      { name: 'Rindfleisch', amount: 1, unit: 'kg' },
      { name: 'Essig', amount: 250, unit: 'ml' },
      { name: 'Zwiebeln', amount: 2, unit: 'Stk' },
      { name: 'Karotten', amount: 2, unit: 'Stk' },
      { name: 'Gewürze', amount: 1, unit: 'Pkg' }
    ],
    steps: [
      'Fleisch 3 Tage beizen.',
      'Scharf anbraten.',
      'Mit Beize ablöschen und weich schmoren.'
    ]
  }
];

export const UI_ICONS = {
  replaced: '⟳', // Discrete replacement
  adapted: '✓',  // For you adapted
  info: 'ℹ️',
  heart: '💚',
  warning: '⚠️',
  blocked: '⛔'
};
