import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, HelpCircle, CheckSquare, BookOpenCheck } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  forceShowAnswer: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, forceShowAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (forceShowAnswer) {
      setIsSubmitted(false);
      setSelectedOptions([]);
    }
  }, [forceShowAnswer]);

  const isMultiple = question.type === 'multiple';
  const showResult = forceShowAnswer || isSubmitted;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'single': return '单选';
      case 'multiple': return '多选';
      case 'judgment': return '判断';
      default: return '未知';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'multiple': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'judgment': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOptionClick = (optionLabel: string) => {
    if (forceShowAnswer || isSubmitted) return;

    if (isMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionLabel) 
          ? prev.filter(o => o !== optionLabel)
          : [...prev, optionLabel]
      );
    } else {
      setSelectedOptions([optionLabel]);
      setIsSubmitted(true);
    }
  };

  const handleSubmitMultiple = () => {
    if (selectedOptions.length > 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className={`
      bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-300
      ${showResult ? 'border-slate-200' : 'border-slate-100'}
    `}>
      {/* Compact Padding: p-4 instead of p-6 */}
      <div className="p-4">
        {/* Header - More Compact */}
        <div className="flex items-center justify-between mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeColor(question.type)}`}>
              {getTypeLabel(question.type)}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">#{question.originalNo}</span>
        </div>
        
        {/* Question Content - Text-base instead of lg, smaller margin */}
        <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
           {question.content}
        </h3>

        {/* Options - Tighter spacing */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const optionLabel = option.charAt(0);
            const isCorrect = question.answer?.includes(optionLabel);
            const isSelected = selectedOptions.includes(optionLabel);
            
            let containerStyle = "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100";
            let icon = null;

            if (showResult) {
               if (isCorrect) {
                 containerStyle = "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500";
                 icon = <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />;
               } else if (isSelected && !isCorrect) {
                 containerStyle = "bg-red-50 border-red-500 text-red-800";
                 icon = <XCircle size={16} className="text-red-600 flex-shrink-0" />;
               } else {
                 containerStyle = "opacity-60 grayscale bg-white border-slate-100";
               }
            } else {
              if (isSelected) {
                containerStyle = "bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500 shadow-sm";
              }
            }

            return (
              <div 
                key={index}
                onClick={() => handleOptionClick(optionLabel)}
                className={`
                  relative flex items-start p-3 rounded-lg border text-sm transition-all duration-200 cursor-pointer select-none leading-normal
                  ${containerStyle}
                `}
              >
                <div className="flex-1">{option}</div>
                {icon && <div className="ml-2 mt-0.5">{icon}</div>}
              </div>
            );
          })}
        </div>

        {/* Multiple Choice Submit Button - More compact */}
        {isMultiple && !showResult && !forceShowAnswer && (
          <button 
            onClick={handleSubmitMultiple}
            disabled={selectedOptions.length === 0}
            className={`
              mt-4 w-full py-2.5 rounded-lg flex items-center justify-center text-sm font-bold transition-all
              ${selectedOptions.length > 0 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            <CheckSquare size={16} className="mr-1.5" />
            提交答案
          </button>
        )}

        {/* Reference Answer & Explanation Section - Tighter Layout */}
        {showResult && question.answer && (
          <div className={`
            mt-3 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-300 border
            ${isSubmitted && selectedOptions.some(o => !question.answer?.includes(o)) || isSubmitted && question.answer?.split('').some(a => !selectedOptions.includes(a)) 
              ? 'bg-red-50 border-red-100 text-red-900' 
              : 'bg-green-50 border-green-100 text-green-900'
            }
          `}>
            {/* Answer Header */}
            <div className="px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/50 p-1 rounded mr-2">
                  <HelpCircle size={14} className="opacity-70" />
                </div>
                <span className="text-xs font-semibold opacity-80 mr-2">正确答案</span>
                <span className="text-lg font-bold tracking-widest leading-none">{question.answer}</span>
              </div>
            </div>

            {/* Explanation */}
            {question.explanation && (
              <div className="px-3 pb-3 pt-0">
                <div className="border-t border-black/5 pt-2 mt-0.5">
                  <div className="flex items-start gap-2 text-xs leading-relaxed opacity-90">
                    <BookOpenCheck size={14} className="mt-0.5 flex-shrink-0 opacity-60" />
                    <span className="text-justify">
                      {question.explanation}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
