
export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  mimeType: string;
}

export enum TemplateType {
  EXECUTIVE_SUMMARY = 'EXECUTIVE_SUMMARY',
  CASE_STUDY = 'CASE_STUDY',
  STRATEGIC_FRAMEWORK = 'STRATEGIC_FRAMEWORK',
  PORTFOLIO_GRID = 'PORTFOLIO_GRID'
}

export interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  mainPoint: string;
  bulletPoints: string[];
  template: TemplateType;
  aiImageUrl?: string;
  aiPromptUsed?: string;
}
