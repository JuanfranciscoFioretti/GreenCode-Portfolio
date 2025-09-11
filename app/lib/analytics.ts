import { NextRequest } from 'next/server';

export interface AnalyticsData {
  visitors: number;
  projectClicks: { [key: string]: number };
  formSubmissions: number;
}

const analyticsData: AnalyticsData = {
  visitors: 0,
  projectClicks: {},
  formSubmissions: 0,
};

export const trackVisitor = () => {
  analyticsData.visitors += 1;
};

export const trackProjectClick = (projectTitle: string) => {
  analyticsData.projectClicks[projectTitle] = (analyticsData.projectClicks[projectTitle] || 0) + 1;
};

export const trackFormSubmission = () => {
  analyticsData.formSubmissions += 1;
};

export const getAnalyticsData = () => {
  return analyticsData;
};

export const analyticsMiddleware = async (req: NextRequest) => {
  trackVisitor();
};