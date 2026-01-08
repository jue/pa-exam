export type QuestionType = 'single' | 'multiple' | 'judgment';

export interface Question {
  id: string; // We use string because some IDs might be "48" or "50 (1)" if duplicates exist
  originalNo: string;
  type: QuestionType;
  content: string;
  options: string[];
  answer?: string; // Added field for reference answer
}
