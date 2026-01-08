import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle, ExternalLink, CloudCog } from 'lucide-react';
import { JsonBinConfig } from '../services/jsonBinService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: JsonBinConfig | null;
  onSave: (config: JsonBinConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, config, onSave }) => {
  const [binId, setBinId] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (isOpen && config) {
      setBinId(config.binId);
      setApiKey(config.apiKey);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (binId && apiKey) {
      onSave({ binId: binId.trim(), apiKey: apiKey.trim() });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-800">
            <CloudCog className="text-orange-600" size={20} />
            <h2 className="font-bold text-lg">云端同步配置</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs leading-relaxed flex gap-2">
            <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">如何获取配置？</p>
              <p>1. 登录 <a href="https://jsonbin.io" target="_blank" className="underline hover:text-blue-600">jsonbin.io</a></p>
              <p>2. 创建一个新的 Bin (Paste your JSON data)，存入初始数据。</p>
              <p>3. 获取 <strong>Bin ID</strong> (URL后缀) 和 <strong>X-Master-Key</strong> (API Keys)。</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              Bin ID
            </label>
            <input
              type="text"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              placeholder="例如: 65a123b..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              X-Master-Key (API Key)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="$2a$10$..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Save size={18} />
            保存并连接
          </button>
        </form>
      </div>
    </div>
  );
};