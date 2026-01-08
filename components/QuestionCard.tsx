import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, HelpCircle, CheckSquare, BookOpenCheck, Pencil, Save, X } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  forceShowAnswer: boolean;
  onUpdate: (id: string, newAnswer: string, newExplanation: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, forceShowAnswer, onUpdate }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit State
  const [editAnswer, setEditAnswer] = useState(question.answer || '');
  const [editExplanation, setEditExplanation] = useState(question.explanation || '');

  useEffect(() => {
    if (forceShowAnswer) {
      setIsSubmitted(false);
      setSelectedOptions([]);
    }
    // Sync edit state when question changes or when editing is cancelled
    setEditAnswer(question.answer || '');
    setEditExplanation(question.explanation || '');
  }, [forceShowAnswer, question]);

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
    if (forceShowAnswer || isSubmitted || isEditing) return;

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

  const handleSaveEdit = () => {
    onUpdate(question.id, editAnswer.toUpperCase(), editExplanation);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditAnswer(question.answer || '');
    setEditExplanation(question.explanation || '');
    setIsEditing(false);
  };

  return (
    <div className={`
      bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-300
      ${showResult ? 'border-slate-200' : 'border-slate-100'}
      ${isEditing ? 'ring-2 ring-orange-400 border-orange-400' : ''}
    `}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeColor(question.type)}`}>
              {getTypeLabel(question.type)}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">#{question.originalNo}</span>
        </div>
        
        {/* Question Content */}
        <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
           {question.content}
        </h3>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const optionLabel = option.charAt(0);
            const isCorrect = question.answer?.includes(optionLabel);
            const isSelected = selectedOptions.includes(optionLabel);
            
            let containerStyle = "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100";
            let icon = null;

            if (showResult && !isEditing) {
               if (isCorrect) {
                 containerStyle = "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500";
                 icon = <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />;
               } else if (isSelected && !isCorrect) {
                 containerStyle = "bg-red-50 border-red-500 text-red-800";
                 icon = <XCircle size={16} className="text-red-600 flex-shrink-0" />;
               } else {
                 containerStyle = "opacity-60 grayscale bg-white border-slate-100";
               }
            } else if (!isEditing) {
              if (isSelected) {
                containerStyle = "bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500 shadow-sm";
              }
            }

            return (
              <div 
                key={index}
                onClick={() => handleOptionClick(optionLabel)}
                className={`
                  relative flex items-start p-3 rounded-lg border text-sm transition-all duration-200 select-none leading-normal
                  ${isEditing ? 'bg-slate-50 opacity-80 cursor-default' : 'cursor-pointer'}
                  ${containerStyle}
                `}
              >
                <div className="flex-1">{option}</div>
                {icon && <div className="ml-2 mt-0.5">{icon}</div>}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {isMultiple && !showResult && !forceShowAnswer && !isEditing && (
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

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-3 bg-orange-50 rounded-lg p-3 border border-orange-200 animate-in fade-in zoom-in-95">
            <div className="mb-3">
              <label className="block text-xs font-bold text-orange-800 mb-1">修改答案</label>
              <input 
                type="text" 
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                className="w-full text-base border border-orange-300 rounded p-2 focus:ring-2 focus:ring-orange-500"
                placeholder="例如: AB"
              />
              <p className="text-[10px] text-orange-600 mt-1">多选请直接输入字母，如 ABCD</p>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-bold text-orange-800 mb-1">修改解析</label>
              <textarea 
                value={editExplanation}
                onChange={(e) => setEditExplanation(e.target.value)}
                rows={3}
                className="w-full text-sm border border-orange-300 rounded p-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSaveEdit}
                className="flex-1 bg-orange-600 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-1"
              >
                <Save size={14} /> 保存
              </button>
              <button 
                onClick={handleCancelEdit}
                className="flex-1 bg-white text-slate-600 border border-slate-300 py-2 rounded text-xs font-bold flex items-center justify-center gap-1"
              >
                <X size={14} /> 取消
              </button>
            </div>
          </div>
        )}

        {/* Reference Answer & Explanation Section */}
        {showResult && !isEditing && question.answer && (
          <div className={`
            mt-3 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-300 border group relative
            ${isSubmitted && selectedOptions.some(o => !question.answer?.includes(o)) || isSubmitted && question.answer?.split('').some(a => !selectedOptions.includes(a)) 
              ? 'bg-red-50 border-red-100 text-red-900' 
              : 'bg-green-50 border-green-100 text-green-900'
            }
          `}>
            {/* Edit Button (Visible on hover or always visible on mobile) */}
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 text-slate-400 hover:text-orange-600 hover:bg-white transition-all"
              title="纠错/修改答案"
            >
              <Pencil size={14} />
            </button>

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
                    <span className="text-justify pr-6">
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
