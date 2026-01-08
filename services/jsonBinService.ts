import { Question } from '../types';

const BASE_URL = 'https://api.jsonbin.io/v3/b';

export interface JsonBinConfig {
  binId: string;
  apiKey: string;
}

export const JsonBinService = {
  // Fetch data from the bin
  async fetchData(config: JsonBinConfig): Promise<Question[] | null> {
    try {
      const response = await fetch(`${BASE_URL}/${config.binId}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': config.apiKey,
          // Content-Type is not needed for GET and can sometimes cause issues
        }
      });

      if (!response.ok) {
        // If 404, it means the Bin ID is wrong (or user provided Account ID). 
        // Return null to let the app fall back to local data gracefully.
        if (response.status === 404) {
          console.warn('JSONBin: Bin ID not found (404). Using local data.');
          return null;
        }

        if (response.status === 401 || response.status === 403) {
          throw new Error('API Key 错误或无权访问');
        }
        
        const errText = await response.text();
        throw new Error(`获取失败 (${response.status}): ${errText}`);
      }

      const data = await response.json();
      return data.record as Question[];
    } catch (error: any) {
      // Don't throw for 404s handled above, but rethrow others
      if (error.message?.includes('404')) return null;
      console.error('JSONBin Fetch Error:', error);
      throw error;
    }
  },

  // Update data in the bin
  async updateData(config: JsonBinConfig, questions: Question[]): Promise<void> {
    const response = await fetch(`${BASE_URL}/${config.binId}`, {
      method: 'PUT',
      headers: {
        'X-Master-Key': config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questions)
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('BIN_NOT_FOUND'); // Specific error code to trigger recovery
      }
      const errText = await response.text();
      throw new Error(`同步失败 (${response.status}): ${errText}`);
    }
  },

  // Create a new bin (Used for recovery when Bin ID is invalid)
  async createData(apiKey: string, questions: Question[]): Promise<string> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'X-Master-Key': apiKey,
        'Content-Type': 'application/json',
        'X-Bin-Name': 'Exam_Data_Backup'
      },
      body: JSON.stringify(questions)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`创建数据失败 (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.metadata.id; // Return the new Bin ID
  }
};