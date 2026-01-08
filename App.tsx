import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { QuestionCard } from './components/QuestionCard';
import { QuestionType } from './types';
import { useExamData } from './hooks/useExamData';
import { BookOpen, AlertCircle, Eye, EyeOff, Download, Cloud, RefreshCw, AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';

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

  // Filter Logic
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    
    return questions.filter((item) => {
      // 1. Filter by Tab
      if (activeTab !== 'all' && item.type !== activeTab) {
        return false;
      }

      // 2. Filter by Search Term
      if (!term) return true;

      const contentMatch = item.content.toLowerCase().includes(term);
      const idMatch = item.originalNo.toLowerCase().includes(term);
      const optionsMatch = item.options.some(opt => opt.toLowerCase().includes(term));

      return contentMatch || idMatch || optionsMatch;
    });
  }, [questions, searchTerm, activeTab]);

  // Counts for tabs
  const counts = useMemo(() => {
    const getCount = (type: QuestionType) => 
      questions.filter(i => i.type === type).length;
    
    return {
      all: questions.length,
      single: getCount('single'),
      multiple: getCount('multiple'),
      judgment: getCount('judgment')
    };
  }, [questions]);

  // Export Function
  const handleExport = () => {
    const fileContent = `import { Question } from './types';\n\n// Updated Data exported from App\nexport const EXAM_DATA: Question[] = ${JSON.stringify(questions, null, 2)};`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-10 bg-slate-50">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-2 space-y-3">
          
          {/* Top Row: Logo/Title & Actions */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-orange-700">
               <BookOpen size={20} strokeWidth={2.5} />
               <div className="flex flex-col">
                 <h1 className="text-base font-extrabold leading-none tracking-tight text-slate-900">职场管理员考试</h1>
               </div>
             </div>
             
             {/* Action Buttons */}
             <div className="flex items-center gap-3">
               {/* Status Indicator */}
               <div className="flex items-center" title={isSyncing ? "正在保存..." : isLoading ? "正在加载..." : "云端已连接"}>
                  {isSyncing || isLoading ? (
                    <Loader2 size={16} className="animate-spin text-orange-500" />
                  ) : error ? (
                    <AlertTriangle size={16} className="text-red-500" />
                  ) : (
                    <Cloud size={16} className="text-green-500" />
                  )}
               </div>

               <button 
                onClick={handleExport}
                className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1.5 rounded hover:bg-blue-100 transition-colors"
                title="导出数据备份"
               >
                 <Download size={14} />
                 备份
               </button>
             </div>
          </div>
          
          {/* Error Message Bar */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded text-xs animate-in slide-in-from-top-2">
              <AlertTriangle size={12} />
              <span className="flex-1">{error}</span>
              <button onClick={() => window.location.reload()}><RefreshCw size={12} /></button>
            </div>
          )}

          {/* Second Row: Search + Toggle */}
          <div className="flex gap-2">
            <div className="flex-1">
               <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className={`
                flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200 border flex-shrink-0
                ${showAllAnswers
                  ? 'bg-orange-50 text-orange-600 border-orange-200'
                  : 'bg-white text-slate-500 border-slate-200'
                }
              `}
              aria-label={showAllAnswers ? '切换到答题模式' : '切换到背题模式'}
            >
              {showAllAnswers ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          
          {/* Third Row: Tabs */}
          <div className="pb-1">
            <CategoryTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              counts={counts}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-3 py-3">
        {isLoading && questions.length === 0 ? ( // Only show full loader if we have no data at all
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-2 text-orange-500" size={32} />
            <p className="text-sm">正在同步云端题库...</p>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-3">
            {filteredData.map((question) => (
              <QuestionCard 
                key={question.id} 
                question={question} 
                forceShowAnswer={showAllAnswers}
                onUpdate={updateQuestion}
              />
            ))}
            
            <div className="text-center py-8 space-y-3 border-t border-slate-100 mt-6">
               <div className="text-slate-400 text-xs">
                已显示 {filteredData.length} 道题目
               </div>
               {/* Admin Helper: Init Cloud Data */}
               <div className="flex justify-center">
                 <button 
                  onClick={initCloudData}
                  className="group flex items-center gap-1.5 text-[10px] text-slate-300 hover:text-orange-500 transition-colors px-3 py-1 rounded-full hover:bg-orange-50"
                  title="如果云端是空的，点击此按钮上传当前默认数据"
                 >
                   <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-500" />
                   初始化/重置云端数据
                 </button>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 text-center">
            <div className="bg-slate-100 p-3 rounded-full mb-3">
              <AlertCircle size={24} className="text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-700">未找到相关题目</h3>
            <button 
              onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
              className="mt-4 px-5 py-1.5 bg-white border border-slate-300 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              清除筛选
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;