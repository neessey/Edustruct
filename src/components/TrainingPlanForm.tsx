/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface TrainingPlanFormProps {
  onSubmit: (title: string, keywords: string) => void;
  isLoading: boolean;
}

export function TrainingPlanForm({ onSubmit, isLoading }: TrainingPlanFormProps) {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && keywords.trim()) {
      onSubmit(title, keywords);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Titre de la formation
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ex: Design Thinking pour PMs"
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans text-base placeholder:text-slate-400"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="keywords" className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Compétences & Mots-clés
        </label>
        <textarea
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="ex: Empathie, Prototypage, Tests utilisateurs, Itérations..."
          rows={4}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans text-base placeholder:text-slate-400"
          required
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01, backgroundColor: "#4f46e5" }}
        whileTap={{ scale: 0.99 }}
        disabled={isLoading}
        type="submit"
        className="w-full bg-indigo-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 disabled:bg-slate-300 shadow-lg shadow-indigo-600/10 transition-all uppercase font-bold text-xs tracking-widest"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Génération...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Générer le plan
          </>
        )}
      </motion.button>
    </form>
  );
}
