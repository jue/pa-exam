import React from 'react';
import { QuestionType } from '../types';

interface CategoryTabsProps {
  activeTab: QuestionType | 'all';
  onTabChange: (tab: QuestionType | 'all') => void;
  counts: { all: number; single: number; multiple: number; judgment: number };
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'all', label: '全部', count: counts.all },
    { id: 'single', label: '单选', count: counts.single },
    { id: 'multiple', label: '多选', count: counts.multiple },
    { id: 'judgment', label: '判断', count: counts.judgment },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as QuestionType | 'all')}
          className={`
            flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border
            ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }
          `}
        >
          {tab.label}
          <span
            className={`ml-1.5 text-[10px] py-0.5 px-1.5 rounded-full ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};
