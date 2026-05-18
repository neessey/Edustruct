/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

// import.meta.env may not be typed in this TS config; cast to any to access Vite env vars
const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY as string });

export async function generateTrainingPlan(title: string, keywords: string): Promise<string> {
  const model = "gemini-3-flash-preview";

  const prompt = `
    Agis en tant qu'Ingénieur Pédagogique (Instructional Designer) expert.
    Génère un plan de formation détaillé en français basé sur les informations suivantes :
    
    Titre de la formation : ${title}
    Mots-clés / Compétences visées : ${keywords}
    
    Structure attendue (TRÈS IMPORTANT) :
    Décompose la formation en modules logiques. Chaque module doit obligatoirement inclure les sections suivantes :
    1. Introduction : Objectifs du module et contexte.
    2. Théorie : Concepts clés et apports théoriques.
    3. Pratique : Exercices, ateliers ou mises en situation.
    4. Évaluation : Méthodes de validation des acquis pour ce module.
    
    Format de sortie : Markdown pur et élégant.
    - Utilise des titres (#, ##, ###).
    - Utilise des listes à puces.
    - Ajoute une section "Introduction Générale" au début et une "Conclusion / Certification" à la fin.
    - Inclus des durées estimées pour chaque module.
    
    Ne réponds qu'avec le contenu Markdown, sans texte d'introduction ou de conclusion de l'IA.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Erreur lors de la génération du plan.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Impossible de générer le plan de formation.");
  }
}
