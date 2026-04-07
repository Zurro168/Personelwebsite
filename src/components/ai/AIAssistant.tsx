'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '您好，我是“硅基分身” (RAG)。我可以为您检索网站内关于大宗商品、宏观经济或主理人经验的相关信息。有什么可以帮您的？' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Mock AI Response (for now)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `这是“硅基大宗”的测试响应：针对您提到的“${userMsg}”，我正在连接研报库索引进行检索...（集成后端后的真实 RAG 逻辑将在此运行）` 
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-brand-blue rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,112,243,0.5)] border border-white/20 hover:scale-110 transition-all z-[100] group"
      >
        <MessageSquare className="text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1A1A1B]"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-[380px] h-[550px] bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl z-[101] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-brand-blue/90 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-white" />
              <div>
                <h4 className="text-sm font-bold text-white">硅基分身 (RAG)</h4>
                <p className="text-[10px] text-white/70">Connecting to Knowledge Base...</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-gold' : 'bg-brand-blue'}`}>
                    {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                  </div>
                  <div className={`p-3 rounded-lg text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-blue/10 border border-brand-blue/20 text-white' : 'bg-white/5 border border-white/10 text-white/80'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 p-3 rounded-lg text-sm bg-white/5 border border-white/10 italic text-white/40">
                  <Loader2 size={16} className="animate-spin" />
                  Generating insights...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-black/20">
            <div className="relative">
              <input 
                type="text"
                placeholder="Ask about commodities, macro or research..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-blue hover:bg-brand-blue/20 rounded transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-white/20 text-center tracking-widest uppercase">
              Powered by Silicon Commodity AI Engine
            </p>
          </form>
        </div>
      )}
    </>
  );
}
