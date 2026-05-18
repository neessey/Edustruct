/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ReactMarkdown from "react-markdown";
import { Download, FileText, Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { downloadMarkdown } from "../lib/utils";
import { useState } from "react";

interface MarkdownPreviewProps {
  content: string;
  title: string;
}

export function MarkdownPreview({ content, title }: MarkdownPreviewProps) {
  const [copied, setCopied] = useState(false);

  if (!content) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 p-12 text-center">
        <FileText className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-sans italic">Le plan apparaîtra ici après la génération.</p>
      </div>
    );
  }

  const handleDownload = () => {
    const filename = `${title.toLowerCase().replace(/\s+/g, "-")}-plan.md`;
    downloadMarkdown(content, filename);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl flex flex-col h-full overflow-hidden shadow-sm"
    >
      <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <FileText className="w-3 h-3" />
          Plan de formation
        </span>
        <div className="flex items-center gap-6">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copié !" : "Copier"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <Download className="w-3 h-3" />
            Markdown
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 lg:p-12 prose font-sans scrollbar-thin scrollbar-thumb-slate-200">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
}

