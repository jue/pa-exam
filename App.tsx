import React, { useState, useMemo } from 'react';
import { EXAM_DATA } from './data';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { QuestionCard } from './components/QuestionCard';
import { QuestionType } from './types';
import { BookOpen, AlertCircle, Eye, EyeOff } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<QuestionType | 'all'>('all');
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  // Filter Logic
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    
    return EXAM_DATA.filter((item) => {
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
  }, [searchTerm, activeTab]);

  // Counts for tabs
  const counts = useMemo(() => {
    const getCount = (type: QuestionType) => 
      EXAM_DATA.filter(i => i.type === type).length;
    
    return {
      all: EXAM_DATA.length,
      single: getCount('single'),
      multiple: getCount('multiple'),
      judgment: getCount('judgment')
    };
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
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
             <div className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
               模拟卷 2026
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
      <main className="max-w-3xl mx-auto px-4 py-4">
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((question) => (
              <QuestionCard 
                key={question.id} 
                question={question} 
                forceShowAnswer={showAllAnswers}
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
