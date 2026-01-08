import { useState, useEffect } from 'react';
import { Question } from '../types';
import { EXAM_DATA } from '../data';

const STORAGE_KEY = 'exam_corrections_v1';

export const useExamData = () => {
  const [questions, setQuestions] = useState<Question[]>(EXAM_DATA);

  // Load corrections from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const corrections = JSON.parse(stored);
        
        setQuestions(prevQuestions => 
          prevQuestions.map(q => {
            if (corrections[q.id]) {
              return { ...q, ...corrections[q.id] };
            }
            return q;
          })
        );
      }
    } catch (e) {
      console.error("Failed to load corrections", e);
    }
  }, []);

  const updateQuestion = (id: string, newAnswer: string, newExplanation: string) => {
    // 1. Update State
    setQuestions(prev => 
      prev.map(q => 
        q.id === id 
          ? { ...q, answer: newAnswer, explanation: newExplanation } 
          : q
      )
    );

    // 2. Persist to LocalStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const corrections = stored ? JSON.parse(stored) : {};
      
      corrections[id] = { answer: newAnswer, explanation: newExplanation };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(corrections));
    } catch (e) {
      console.error("Failed to save correction", e);
    }
  };

  const resetCorrections = () => {
    if (confirm('确定要重置所有本地修改的答案吗？')) {
      localStorage.removeItem(STORAGE_KEY);
      setQuestions(EXAM_DATA);
    }
  };

  return { questions, updateQuestion, resetCorrections };
};
