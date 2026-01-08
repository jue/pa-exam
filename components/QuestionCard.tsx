import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, HelpCircle, CheckSquare } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  forceShowAnswer: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, forceShowAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when forceShowAnswer changes (optional, but good for switching modes)
  // or when question id changes (handled by React key in parent)
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
      case 'single': return '单选题';
      case 'multiple': return '多选题';
      case 'judgment': return '判断题';
      default: return '未知';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'multiple': return 'bg-purple-100 text-purple-800';
      case 'judgment': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOptionClick = (optionLabel: string) => {
    if (forceShowAnswer || isSubmitted) return; // Prevent interaction in study mode or after submit

    if (isMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionLabel) 
          ? prev.filter(o => o !== optionLabel)
          : [...prev, optionLabel]
      );
    } else {
      // Single/Judgment: Immediate submit
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
      bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300
      ${showResult ? 'border-slate-200' : 'border-slate-100 hover:shadow-md'}
    `}>
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getTypeColor(question.type)}`}>
              {getTypeLabel(question.type)}
            </span>
            <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">#{question.originalNo}</span>
        </div>
        
        {/* Question Content */}
        <h3 className="text-lg font-bold text-slate-900 mb-6 leading-relaxed">
           {question.content}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionLabel = option.charAt(0); // Assumes "A. Text" format
            const isCorrect = question.answer?.includes(optionLabel);
            const isSelected = selectedOptions.includes(optionLabel);
            
            // Determine Styling
            let containerStyle = "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100";
            let icon = null;

            if (showResult) {
               // Result Mode
               if (isCorrect) {
                 containerStyle = "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500";
                 icon = <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />;
               } else if (isSelected && !isCorrect) {
                 containerStyle = "bg-red-50 border-red-500 text-red-800";
                 icon = <XCircle size={20} className="text-red-600 flex-shrink-0" />;
               } else {
                 containerStyle = "opacity-50 grayscale";
               }
            } else {
              // Interactive Mode
              if (isSelected) {
                containerStyle = "bg-blue-50 border-blue-500 text-blue-800 ring-1 ring-blue-500 shadow-sm";
              }
            }

            return (
              <div 
                key={index}
                onClick={() => handleOptionClick(optionLabel)}
                className={`
                  relative flex items-center p-3.5 rounded-xl border text-base transition-all duration-200 cursor-pointer select-none
                  ${containerStyle}
                `}
              >
                <div className="flex-1 font-medium">{option}</div>
                {icon && <div className="ml-3">{icon}</div>}
              </div>
            );
          })}
        </div>

        {/* Multiple Choice Submit Button */}
        {isMultiple && !showResult && !forceShowAnswer && (
          <button 
            onClick={handleSubmitMultiple}
            disabled={selectedOptions.length === 0}
            className={`
              mt-6 w-full py-3 rounded-xl flex items-center justify-center font-bold transition-all
              ${selectedOptions.length > 0 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            <CheckSquare size={18} className="mr-2" />
            提交答案
          </button>
        )}

        {/* Reference Answer Section */}
        {showResult && question.answer && (
          <div className={`
            mt-6 p-4 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2 duration-300
            ${isSubmitted && selectedOptions.some(o => !question.answer?.includes(o)) || isSubmitted && question.answer?.split('').some(a => !selectedOptions.includes(a)) 
              ? 'bg-red-50 text-red-900' // Show red background if user submitted wrong answer
              : 'bg-green-50 text-green-900' // Show green background if correct (or in study mode)
            }
          `}>
            <HelpCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 opacity-70" />
            <div>
              <div className="text-xs font-semibold uppercase opacity-70 mb-1">正确答案</div>
              <div className="text-2xl font-bold tracking-widest">{question.answer}</div>
              
              {!forceShowAnswer && isSubmitted && (
                 <div className="mt-2 text-sm font-medium opacity-90">
                    {(() => {
                        const userStr = selectedOptions.sort().join('');
                        const ansStr = question.answer || '';
                        if (userStr === ansStr) return "回答正确！🎉";
                        return "回答错误，请查看正确答案。";
                    })()}
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
