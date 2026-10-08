'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, X, Bot, User, Loader2, ArrowRight, BookOpen, Terminal } from 'lucide-react';
import { ALL_REPORTS } from '@/data/reports';
import { AUTHOR_INFO } from '@/data/biography';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  links?: { title: string; href: string; tag?: string }[];
}

const QUICK_PROMPTS = [
  '铜产业链与AI采购决策',
  'GCTS 智能交易系统架构',
  '王国东主理人实业履历',
  '2026战略金属供需断层'
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `您好，我是「硅基大宗智能分身」。我已索引全站 20+ 篇深度产业研报、4 大战略金属周期模型以及主理人 ${AUTHOR_INFO.name} 20 余年的实业运营知识库。您可以向我提问关于金属供需、宏观周期或业务合作的问题。`,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef<number>(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // 本地语义与关键词检索逻辑
  const processQuery = (query: string): { text: string; links?: { title: string; href: string; tag?: string }[] } => {
    const q = query.toLowerCase().trim();

    // 1. 履历与主理人相关
    if (q.includes('简历') || q.includes('履历') || q.includes('王国东') || q.includes('王国慧') || q.includes('主理人') || q.includes('经验') || q.includes('背景') || q.includes('gordon')) {
      return {
        text: `【主理人背景概览】：\n王国东 (Gordon Wang，证件名王国慧)，关键矿产跨境供应链与矿冶运营专家。深耕大宗商品国际贸易、供应链金融及实体矿冶生产 20 余载。\n• 曾任越南海阳新源冶金常务副总（驻守 10 年，主导 19000KVA×2 矿热炉建设与 3 亿美元铁合金海外直采）；\n• 现任正矿供应链总经理，专注锆钛/钽铌/锑/钨/锂全链条运营与跨境 L/C 供应链金融。\n• 毕业于西安交大（电子商务学士）及香港大学 SPACE 学院（全球运营与管理研究生）。`,
        links: [
          { title: '查看完整实业履历与业绩证据', href: '/about', tag: '关于我们' },
          { title: '大宗商品交易：从信息红利到认知非对称', href: '/portfolio/trader-core-competency-2026', tag: '交易能力' }
        ]
      };
    }

    // 2. GCTS 交易操作系统相关
    if (q.includes('gcts') || q.includes('报价') || q.includes('多式联运') || q.includes('乍得') || q.includes('喀麦隆') || q.includes('物流')) {
      return {
        text: `【GCTS 智能报价决策系统 (Global Critical Minerals Trading OS)】：\n这是主理人团队打造的核心跨境贸易决策工具，旨在解决跨国关键矿产运输与金融定价的三大痛点：\n1. 公路/铁路转运联动算法：实现乍得北部 Mongo 矿区至喀麦隆 Ngaoundéré 陆港公路（750km 复杂走廊）的运费倒算与折损拆解；\n2. 100% 物理对账稽核：前端算法与后端脱机 Excel 报表公式严格同步，支持一键下载；\n3. 每年 7.15-10.15 乍得雨季与地缘政治红线主动拦截机制。`,
        links: [
          { title: '启动 GCTS 智能控制中心体验舱', href: '/intersection/gcts', tag: '跨界实验' },
          { title: '打开全屏独立 GCTS OS 控制台', href: '/gcts/index.html', tag: 'Fintech OS' }
        ]
      };
    }

    // 3. 铜产业链相关
    if (q.includes('铜') || q.includes('copper') || q.includes('codelco') || q.includes('bhp')) {
      const copperReports = ALL_REPORTS.filter(r => r.title.includes('铜') || r.slug.includes('copper') || r.description.includes('铜')).slice(0, 3);
      return {
        text: `【铜产业链核心研判】：\n当前铜正处于“物理成本陷阱向硅基对冲重构”的过渡期：\n• 显性库存端：全球 LME/SHFE 库存触及 6 年高点，短期存在结构性回撤阻力；\n• 需求分化（K型）：AI 算力数据中心、全球电网与新能源呈现刚性增长，而通用制造业承压；\n• 矿端供给：智利与秘鲁品位衰减，资本开支纪律趋严，长期物理断层刚性存在。`,
        links: [
          { title: '查看精炼铜实时周期地图与指标', href: '/cycle-map/copper', tag: '周期地图' },
          ...copperReports.map(r => ({ title: r.title, href: `/portfolio/${r.slug}`, tag: r.tag }))
        ]
      };
    }

    // 4. 锂或电池金属相关
    if (q.includes('锂') || q.includes('lithium') || q.includes('电池')) {
      const lithiumReports = ALL_REPORTS.filter(r => r.title.includes('锂') || r.description.includes('锂')).slice(0, 2);
      return {
        text: `【锂矿供需与出清周期】：\n全球锂矿产业正完成从周期性过剩向结构性出清的历史性跨越。\n• 2026年市场正残酷考验各梯队矿山的边际现金成本线；\n• 高成本锂云母与海外部分棕地项目面临减产检修压力；\n• 锂价脱离非理性狂热后，逐步向能够激励优质硬岩与盐湖投产的理性中枢回归。`,
        links: [
          { title: '查看碳酸锂实时周期地图', href: '/cycle-map/lithium', tag: '周期地图' },
          ...lithiumReports.map(r => ({ title: r.title, href: `/portfolio/${r.slug}`, tag: r.tag }))
        ]
      };
    }

    // 5. 钛或锆战略金属
    if (q.includes('钛') || q.includes('锆') || q.includes('战略金属') || q.includes('zirconium') || q.includes('titanium')) {
      const strategicReports = ALL_REPORTS.filter(r => r.title.includes('钛') || r.title.includes('锆') || r.title.includes('战略金属')).slice(0, 2);
      return {
        text: `【战略金属（锆/钛）供需态势】：\n• 海绵钛：受全球民航大飞机复苏及防务军工订单拉动，高标准高纯度钛材呈现结构性稀缺；\n• 海绵锆：澳洲精矿供应动态受限，核电涂层及特种陶瓷需求强韧，处于底部抬升的高溢价周期。`,
        links: [
          { title: '查看海绵钛周期地图', href: '/cycle-map/titanium', tag: '周期地图' },
          { title: '查看海绵锆周期地图', href: '/cycle-map/zirconium', tag: '周期地图' },
          ...strategicReports.map(r => ({ title: r.title, href: `/portfolio/${r.slug}`, tag: r.tag }))
        ]
      };
    }

    // 6. 全文关键词匹配通用搜索
    const matched = ALL_REPORTS.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tag.toLowerCase().includes(q)
    ).slice(0, 3);

    if (matched.length > 0) {
      return {
        text: `为您在「硅基大宗」研报库中检索到以下相关产业文献：`,
        links: matched.map(r => ({ title: r.title, href: `/portfolio/${r.slug}`, tag: r.tag }))
      };
    }

    // 默认兜底合成响应
    return {
      text: `针对您关注的「${query}」，建议从以下核心入口探索：\n• 宏观与资本：探讨美元周期引力、降息补库节奏与资源长波；\n• 物理实业：查看刚果金、加蓬、西非西芒杜矿区第一线调研；\n• 决策工具：体验 GCTS 跨境多式联运报价引擎。`,
      links: [
        { title: '浏览全部 20+ 篇深度研报库', href: '/portfolio', tag: '研报智库' },
        { title: '查阅四大战略金属周期前哨', href: '/cycle-map', tag: '周期地图' },
        { title: '联系主理人进行产业合作探讨', href: '/about', tag: '主理人' }
      ]
    };
  };

  const handleSend = (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const query = userText.trim();
    idCounterRef.current += 1;
    const userMsgId = `msg-${idCounterRef.current}`;
    idCounterRef.current += 1;
    const assistantMsgId = `msg-${idCounterRef.current}`;

    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: query }]);
    setInput('');
    setIsLoading(true);

    // 模拟算法推理流，带来极佳的实时感
    setTimeout(() => {
      const response = processQuery(query);
      setMessages(prev => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: response.text,
          links: response.links
        }
      ]);
      setIsLoading(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* 悬浮唤醒按钮 (Floating Trigger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.4)] border border-white/20 hover:scale-110 active:scale-95 transition-all z-[90] group"
        aria-label="打开硅基分身智能助手"
      >
        <Bot size={24} className="text-slate-950 group-hover:rotate-6 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0a0f1a] animate-pulse"></span>
      </button>

      {/* 对话窗口 (Chat Modal Drawer) */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[80vh] bg-slate-950/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl z-[95] animate-in fade-in slide-in-from-bottom-6">
          
          {/* 顶栏 Header */}
          <div className="p-4 sm:px-6 bg-slate-900/90 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Terminal size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-wider">硅基分身 (RAG Copilot)</h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">Silicon Commodity AI Agent v3.0</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="关闭对话框"
            >
              <X size={18} />
            </button>
          </div>

          {/* 快捷 Prompts 胶囊栏 */}
          <div className="px-4 py-2.5 bg-slate-900/50 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-400/30 text-[10px] font-mono text-slate-300 hover:text-cyan-300 transition-all whitespace-nowrap shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* 消息滚动区 */}
          <div ref={scrollRef} className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.role === 'user' ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed space-y-2.5 ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/15 border border-cyan-500/30 text-white rounded-tr-sm'
                        : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line font-light">{msg.content}</div>

                    {/* 关联研报超链接卡片 */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <div className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-wider flex items-center gap-1">
                          <BookOpen size={11} /> 智库研报与系统索引：
                        </div>
                        {msg.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block p-2 rounded-lg bg-black/40 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-400/30 transition-all group"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white text-[11px] font-bold group-hover:text-cyan-300 transition-colors line-clamp-1">
                                {link.title}
                              </span>
                              <ArrowRight size={11} className="text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                            {link.tag && (
                              <span className="text-[9px] font-mono text-cyan-400/60 uppercase mt-0.5 block">
                                #{link.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2.5 items-center px-4 py-3 rounded-2xl text-xs bg-slate-900/90 border border-white/10 text-cyan-400/80 font-mono italic">
                  <Loader2 size={13} className="animate-spin" />
                  <span>Scanning Research Index & Macro Embeddings...</span>
                </div>
              </div>
            )}
          </div>

          {/* 输入表单 */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/80">
            <div className="relative">
              <input
                type="text"
                placeholder="提问大宗商品、战略矿产、宏观模型或合作..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors font-sans"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-30 rounded-lg transition-all"
                aria-label="发送消息"
              >
                <Send size={15} />
              </button>
            </div>
            <div className="mt-2 text-[9px] text-slate-500 text-center font-mono tracking-widest uppercase">
              Silicon Commodity Neural Engine V3.0
            </div>
          </form>

        </div>
      )}
    </>
  );
}
