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
      {/* Sticky Header - Compact for Mobile */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-2 space-y-2">
          
          {/* Top Row: Logo + Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-600 p-1.5 rounded-lg text-white shadow-sm flex-shrink-0">
                <BookOpen size={18} />
              </div>
              <div className="leading-none">
                <h1 className="text-sm font-bold text-slate-900">职场管理员考试</h1>
                <p className="text-[10px] text-slate-500 mt-0.5">2026年上半年模拟卷</p>
              </div>
            </div>

            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className={`
                flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border
                ${showAllAnswers
                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
                }
              `}
            >
              {showAllAnswers ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>{showAllAnswers ? '背题模式' : '答题模式'}</span>
            </button>
          </div>

          {/* Second Row: Search */}
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          
          {/* Third Row: Tabs */}
          <CategoryTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            counts={counts}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        {filteredData.length > 0 ? (
          <div className="space-y-3">
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
