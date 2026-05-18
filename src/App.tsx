/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TrainingPlanForm } from "./components/TrainingPlanForm";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { generateTrainingPlan } from "./services/geminiService";
import { BookOpen, GraduationCap } from "lucide-react";
import { cn } from "./lib/utils";

export default function App() {
  const [plan, setPlan] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (title: string, keywords: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentTitle(title);
    try {
      const result = await generateTrainingPlan(title, keywords);
      setPlan(result);
    } catch (err) {
      setError("Une erreur est survenue lors de la génération. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">EduStruct</h1>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            Ingénierie Pédagogique
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar / Input Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                L'architecte de vos <span className="text-indigo-600">formations.</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Transformez vos concepts en parcours pédagogiques structurés.
                Générez des modules complets incluant théorie, pratique et évaluation en quelques secondes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <TrainingPlanForm onSubmit={handleGenerate} isLoading={isLoading} />
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Méthodologie</h4>
                  <p className="text-xs font-medium text-slate-600">Structure modulaire standard (Introduction - Théorie - Pratique - Évaluation).</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Export rapide</h4>
                  <p className="text-xs font-medium text-slate-600">Format Markdown optimisé pour Notion et vos outils de documentation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-8 flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
            <MarkdownPreview content={plan} title={currentTitle} />
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", isLoading ? "bg-amber-400 animate-pulse" : plan ? "bg-green-500" : "bg-slate-300")} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {isLoading ? "Génération en cours..." : plan ? "Prêt pour export" : "En attente d'input"}
          </span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Made by Yaniss-Elie Sey
        </div>
      </footer>
    </div>
  );
}

