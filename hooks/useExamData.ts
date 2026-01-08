import { useState, useEffect } from 'react';
import { Question } from '../types';
import { EXAM_DATA } from '../data';
import { JsonBinService, JsonBinConfig } from '../services/jsonBinService';

// Initial Hardcoded Configuration
const DEFAULT_CLOUD_CONFIG: JsonBinConfig = {
  binId: '695f5a0d03998b11ea8db677', // If this is an Account ID, it will fail with 404, triggering auto-recovery
  apiKey: '$2a$10$7D1LeI/pScFPkN6PZTQbouHGm0bklmHSb0qjlr.ZFb7Ee36KkFkYG'
};

const BIN_ID_STORAGE_KEY = 'valid_jsonbin_id_v1';

export const useExamData = () => {
  const [questions, setQuestions] = useState<Question[]>(EXAM_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Dynamic Config State (allows overriding the hardcoded ID with a valid one)
  const [activeConfig, setActiveConfig] = useState<JsonBinConfig>(DEFAULT_CLOUD_CONFIG);

  // Initialize: Check local storage for a valid override ID
  useEffect(() => {
    const storedBinId = localStorage.getItem(BIN_ID_STORAGE_KEY);
    const configToUse = storedBinId 
      ? { ...DEFAULT_CLOUD_CONFIG, binId: storedBinId } 
      : DEFAULT_CLOUD_CONFIG;
    
    setActiveConfig(configToUse);
    fetchCloudData(configToUse);
  }, []);

  const fetchCloudData = async (config: JsonBinConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const cloudData = await JsonBinService.fetchData(config);
      
      if (cloudData && Array.isArray(cloudData) && cloudData.length > 0) {
        setQuestions(cloudData);
      } else {
        // If null (404) or empty, we silently use local EXAM_DATA
        console.log('Using local data (Cloud data not found or empty).');
      }
    } catch (err: any) {
      console.error("Fetch failed:", err);
      // Only show error if it's strictly Auth related. Network/404 errors fallback silently.
      if (err.message && (err.message.includes('Key') || err.message.includes('无权'))) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuestion = async (id: string, newAnswer: string, newExplanation: string) => {
    // 1. Optimistic Update
    const updatedQuestions = questions.map(q => 
      q.id === id 
        ? { ...q, answer: newAnswer, explanation: newExplanation } 
        : q
    );
    setQuestions(updatedQuestions);

    // 2. Sync to Cloud with Recovery Logic
    setIsSyncing(true);
    try {
      await JsonBinService.updateData(activeConfig, updatedQuestions);
      setError(null);
    } catch (err: any) {
      console.error("Sync failed:", err);
      
      // Auto-Recovery: If Bin Not Found (e.g. invalid ID provided), create a new one!
      if (err.message === 'BIN_NOT_FOUND') {
         console.log('Invalid Bin ID detected. Attempting to create a new Bin...');
         try {
           const newBinId = await JsonBinService.createData(activeConfig.apiKey, updatedQuestions);
           
           // Save new ID to local storage and state
           localStorage.setItem(BIN_ID_STORAGE_KEY, newBinId);
           const newConfig = { ...activeConfig, binId: newBinId };
           setActiveConfig(newConfig);
           
           console.log('Recovery successful! New Bin ID:', newBinId);
           setError(null); // Clear error as we succeeded
         } catch (createErr: any) {
           setError(`自动修复失败: ${createErr.message}`);
         }
      } else {
         setError('保存到云端失败，请检查网络');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const initCloudData = async () => {
    if (!confirm('确定要将当前的本地数据强制写入云端吗？')) return;
    
    setIsSyncing(true);
    try {
      // Try update first
      try {
        await JsonBinService.updateData(activeConfig, questions);
      } catch (err: any) {
        // If update fails due to ID, create new
        if (err.message === 'BIN_NOT_FOUND') {
           const newBinId = await JsonBinService.createData(activeConfig.apiKey, questions);
           localStorage.setItem(BIN_ID_STORAGE_KEY, newBinId);
           setActiveConfig({ ...activeConfig, binId: newBinId });
        } else {
          throw err;
        }
      }
      alert('数据同步成功！');
      setError(null);
    } catch (err: any) {
      alert(`初始化失败: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  }

  return { 
    questions, 
    updateQuestion, 
    isLoading, 
    isSyncing,
    error,
    initCloudData
  };
};