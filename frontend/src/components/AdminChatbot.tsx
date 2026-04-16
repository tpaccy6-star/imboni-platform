'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AdminChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hello Admin! I'm your intelligent Scholarship Research Assistant. How can I help you find trending, fully funded, or specific scholarships today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: { role: 'user' | 'assistant'; content: string }[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/assistant/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('imboni_token')}`
        },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: `Error: ${data.error || 'Failed to communicate with AI server. Please check your GROQ_API_KEY in the backend.'}` }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error while attempting to reach the AI endpoint.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Custom CSS classes for the Markdown rendering to ensure great table formatting
  const markdownStyles = `
    .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 0.8rem; }
    .markdown-content th { background-color: rgba(0,0,0,0.05); padding: 8px; text-align: left; font-weight: bold; border: 1px solid rgba(0,0,0,0.1); }
    .markdown-content td { padding: 8px; border: 1px solid rgba(0,0,0,0.1); }
    .dark .markdown-content th { background-color: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
    .dark .markdown-content td { border-color: rgba(255,255,255,0.1); }
    .markdown-content a { color: #E1B12C; font-weight: bold; }
    .markdown-content a:hover { text-decoration: underline; }
    .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.5rem; }
    .markdown-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.5rem; }
    .markdown-content p { margin-bottom: 0.5rem; }
  `;

  return (
    <>
      <style>{markdownStyles}</style>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#E1B12C] text-[#0A2647] rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-8 right-8 z-[100] ${isExpanded ? 'w-[80vw] h-[85vh]' : 'w-[450px] h-[650px] max-h-[80vh] max-w-[90vw]'} bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col transform transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-white/10 flex justify-between items-center bg-[#0A2647] text-white rounded-t-[2rem]">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#E1B12C] text-[#0A2647] rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
             </div>
             <div>
                <h3 className="font-bold text-sm">Scholarship AI</h3>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest">Research Assistant</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block" title={isExpanded ? "Collapse size" : "Expand size"}>
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`relative ${isExpanded ? 'max-w-[75%]' : 'max-w-[85%]'} p-4 rounded-2xl ${
                 m.role === 'user' 
                 ? 'bg-[#0A2647] text-white rounded-br-sm text-sm' 
                 : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-white/5 rounded-bl-sm group text-sm'
               }`}>
                  {m.role === 'user' ? (
                     <p>{m.content}</p>
                  ) : (
                     <div className="markdown-content overflow-x-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                     </div>
                  )}
                  
                  {m.role === 'assistant' && (
                    <button 
                      onClick={() => handleCopy(m.content, idx)}
                      className="absolute -bottom-3 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg text-slate-400 hover:text-[#E1B12C] dark:hover:text-[#E1B12C] p-1.5 rounded-lg flex items-center justify-center z-10"
                      title="Copy response"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 dark:border-white/5 flex items-center gap-2 text-slate-400">
                 <Loader2 className="w-4 h-4 animate-spin text-[#E1B12C]" />
                 <span className="text-xs font-bold uppercase tracking-widest">Researching...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-slate-900 rounded-b-[2rem]">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative flex items-center"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trending scholarships..."
              className="w-full pl-6 pr-14 py-4 rounded-xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-[#E1B12C] outline-none text-sm dark:bg-slate-800 text-[#0A2647] dark:text-white"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 p-3 bg-[#E1B12C] text-[#0A2647] rounded-lg disabled:opacity-50 hover:bg-[#c99d25] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
