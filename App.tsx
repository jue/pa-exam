import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { QuestionCard } from './components/QuestionCard';
import { QuestionType } from './types';
import { useExamData } from './hooks/useExamData';
import { BookOpen, AlertCircle, Eye, EyeOff, Download, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const { questions, updateQuestion, resetCorrections } = useExamData();
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
    // Generate the TS file content
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
      {/* Sticky Header - Optimized for minimal height */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-2 space-y-3">
          
          {/* Top Row: Logo/Title */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-orange-700">
               <BookOpen size={20} strokeWidth={2.5} />
               <div className="flex flex-col">
                 <h1 className="text-base font-extrabold leading-none tracking-tight text-slate-900">职场管理员考试</h1>
               </div>
             </div>
             
             {/* Action Buttons */}
             <div className="flex items-center gap-3">
               <button 
                onClick={handleExport}
                className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                title="导出当前所有数据为文件"
               >
                 <Download size={12} />
                 导出数据
               </button>
               <button 
                onClick={resetCorrections}
                className="text-[10px] text-slate-400 underline decoration-dotted"
                title="重置所有本地修改"
               >
                 重置
               </button>
             </div>
          </div>

          {/* Second Row: Search + Toggle (Inline to save space) */}
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
        {filteredData.length > 0 ? (
          <div className="space-y-3">
            {filteredData.map((question) => (
              <QuestionCard 
                key={question.id} 
                question={question} 
                forceShowAnswer={showAllAnswers}
                onUpdate={updateQuestion}
              />
            ))}
            
            <div className="text-center py-6 text-slate-400 text-xs">
              已显示 {filteredData.length} 道题目
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
