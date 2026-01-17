
import { GoogleGenAI } from "@google/genai";
import { InventoryItem, Recipe, UserPreferences } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async suggestRecipes(inventory: InventoryItem[], prefs: UserPreferences): Promise<string> {
    const inventoryList = inventory.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(", ");
    const prompt = `
      Ich habe folgendes Inventar: ${inventoryList}.
      Der Nutzer hat folgende Vorlieben: Mag kein ${prefs.dislikes.join(", ")}, ersetzt ${Object.keys(prefs.substitutions).join(", ")}.
      Schlage 3 Rezepte vor, die ich mit diesen Zutaten kochen kann. Antworte in freundlichem Ton als 'Der Stille Helfer'.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || "Entschuldigung, ich konnte gerade keine Vorschläge finden.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Ich habe gerade Verbindungsschwierigkeiten zum Planer-Bot.";
    }
  }
};
