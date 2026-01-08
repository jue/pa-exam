import React, { useState, useMemo, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { QuestionCard } from './components/QuestionCard';
import { QuestionType } from './types';
import { useExamData } from './hooks/useExamData';
import { 
  BookOpen, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Cloud, 
  RefreshCw, 
  AlertTriangle, 
  Loader2, 
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const App: React.FC = () => {
  const { 
    questions, 
    updateQuestion, 
    isLoading, 
    isSyncing, 
    error,
    initCloudData 
  } = useExamData();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<QuestionType | 'all'>('all');
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Filter Logic
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    
    return questions.filter((item) => {
      if (activeTab !== 'all' && item.type !== activeTab) return false;
      if (!term) return true;
      const contentMatch = item.content.toLowerCase().includes(term);
      const idMatch = item.originalNo.toLowerCase().includes(term);
      const optionsMatch = item.options.some(opt => opt.toLowerCase().includes(term));
      return contentMatch || idMatch || optionsMatch;
    });
  }, [questions, searchTerm, activeTab]);

  // SEO: Dynamic Title & Structured Data
  useEffect(() => {
    // Update Document Title
    const typeLabel = activeTab === 'all' ? '全部' : (activeTab === 'single' ? '单选' : activeTab === 'multiple' ? '多选' : '判断');
    document.title = `${typeLabel}题库 - 2026上半年职场管理员考试助手`;

    // Inject JSON-LD for SEO (FAQ Schema)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "url": "https://pa.jue.sh/",
      "mainEntity": filteredData.slice(0, 10).map(q => ({
        "@type": "Question",
        "name": q.content,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `正确答案是：${q.answer}。解析：${q.explanation}`
        }
      }))
    };

    const scriptId = 'json-ld-faq';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(faqSchema);
  }, [activeTab, filteredData]);

  // Counts for tabs
  const counts = useMemo(() => {
    const getCount = (type: QuestionType) => questions.filter(i => i.type === type).length;
    return {
      all: questions.length,
      single: getCount('single'),
      multiple: getCount('multiple'),
      judgment: getCount('judgment')
    };
  }, [questions]);

  const handleDownloadExcel = () => {
    const headers = ['题号', '原始编号', '类型', '题目内容', '备选选项', '正确答案', '解析'];
    const escapeCsvValue = (val: any) => {
      if (val === undefined || val === null) return '""';
      const formatted = String(val).replace(/"/g, '""');
      return `"${formatted}"`;
    };
    const rows = questions.map(q => {
      const typeMap = { single: '单选', multiple: '多选', judgment: '判断' };
      return [q.id, q.originalNo, typeMap[q.type] || q.type, q.content, q.options.join(' | '), q.answer || '', q.explanation || ''];
    });
    const csvContent = [headers.join(','), ...rows.map(row => row.map(escapeCsvValue).join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `平安职场管理员考试题库_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-50" />
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-2 space-y-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-200">
                 <BookOpen size={20} className="text-white" strokeWidth={2.5} />
                 <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                   <ShieldCheck size={12} className="text-orange-600" />
                 </div>
               </div>
               <div className="flex flex-col">
                 <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
                   职场管理员
                   <span className="text-orange-600 ml-0.5 text-sm font-bold opacity-80">考试助手</span>
                 </h1>
                 <div className="flex items-center mt-1">
                   <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-tighter">
                     2026 上半年 · 官方模拟
                   </span>
                 </div>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <div 
                 className={`flex items-center px-2 py-1.5 rounded-lg border transition-all duration-300 ${
                   error ? 'bg-red-50 border-red-100 text-red-500' : 
                   (isSyncing || isLoading) ? 'bg-orange-50 border-orange-100 text-orange-500' : 
                   'bg-green-50 border-green-100 text-green-600'
                 }`}
                 title={error ? "连接失败" : isSyncing ? "同步中..." : "云端已同步"}
               >
                  {isSyncing || isLoading ? <Loader2 size={14} className="animate-spin" /> : error ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
               </div>
               <button onClick={handleDownloadExcel} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm">
                 <FileSpreadsheet size={14} />下载 Excel
               </button>
             </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-red-200 animate-in slide-in-from-top-2">
              <AlertCircle size={14} className="flex-shrink-0" /><span className="flex-1">{error}</span>
              <button onClick={() => window.location.reload()} className="bg-white/20 hover:bg-white/30 p-1 rounded transition-colors">
                <RefreshCw size={12} />
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <div className="flex-1"><SearchBar value={searchTerm} onChange={setSearchTerm} /></div>
            <button onClick={() => setShowAllAnswers(!showAllAnswers)} className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 border flex-shrink-0 ${showAllAnswers ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200' : 'bg-white text-slate-400 border-slate-200 shadow-sm hover:border-orange-300 hover:text-orange-500'}`} title={showAllAnswers ? '切换到答题模式' : '进入背题模式'}>
              {showAllAnswers ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <nav className="pb-1" aria-label="题型分类">
            <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-3 py-4">
        {isLoading && questions.length === 0 ? ( 
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="relative mb-6">
               <div className="absolute inset-0 bg-orange-100 rounded-full scale-150 blur-2xl opacity-50 animate-pulse" />
               <Loader2 className="animate-spin text-orange-500 relative" size={48} />
            </div>
            <h3 className="text-slate-900 font-bold">正在同步云端题库</h3>
            <p className="mt-1 text-xs opacity-60">请稍候，正在为您加载最新考试数据...</p>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((question) => (
              <QuestionCard key={question.id} question={question} forceShowAnswer={showAllAnswers} onUpdate={updateQuestion} />
            ))}
            <div className="text-center py-12 border-t border-slate-200/60 mt-8">
               <div className="text-slate-400 text-[11px] font-medium tracking-wide mb-6">END · 已显示全部 {filteredData.length} 道相关题目</div>
               <div className="flex justify-center">
                 <button onClick={initCloudData} className="group flex items-center gap-1.5 text-[10px] text-slate-300 hover:text-orange-500 transition-all px-4 py-2 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-100">
                   <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-700" />
                   初始化 / 重置云端数据库
                 </button>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6"><AlertCircle size={40} className="text-slate-200" /></div>
            <h3 className="text-slate-900 font-bold text-lg">未找到匹配题目</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-[200px]">试试搜索其他关键字或切换上方的题型分类</p>
            <button onClick={() => { setSearchTerm(''); setActiveTab('all'); }} className="mt-8 px-8 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-orange-600 shadow-lg shadow-slate-200 transition-all active:scale-95">清空筛选条件</button>
          </div>
        )}
      </main>
      <footer className="text-center pb-8 text-slate-300 text-[10px]">
        © 2026 职场管理员考试助手 · 仅供内部学习参考
      </footer>
    </div>
  );
};

export default App;