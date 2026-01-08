import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full py-2.5 pl-9 pr-9 text-sm text-slate-900 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all"
        placeholder="搜索..."
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
